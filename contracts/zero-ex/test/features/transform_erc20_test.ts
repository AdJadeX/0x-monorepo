import {
    blockchainTests,
    constants,
    getRandomInteger,
    getRandomPortion,
    verifyEventsFromLogs,
} from '@0x/contracts-test-utils';
import { hexUtils } from '@0x/utils';

import { artifacts } from '../artifacts';
import { abis } from '../utils/abis';
import { fullMigrateAsync } from '../utils/migration';
import {
    TestMintableERC20TokenContract,
    TestMintTokenERC20TransformerContract,
    TransformERC20Contract,
    TransformERC20Events,
    ZeroExContract,
} from '../wrappers';

blockchainTests.resets('TransformERC20 feature', env => {
    let taker: string;
    let zeroEx: ZeroExContract;
    let feature: TransformERC20Contract;

    before(async () => {
        let owner;
        [owner, taker] = await env.getAccountAddressesAsync();
        zeroEx = await fullMigrateAsync(owner, env.provider, env.txDefaults, {
            transformERC20: (await TransformERC20Contract.deployFrom0xArtifactAsync(
                artifacts.TestTransformERC20,
                env.provider,
                env.txDefaults,
                artifacts,
            )).address,
        });
        feature = new TransformERC20Contract(zeroEx.address, env.provider, env.txDefaults, abis);
    });

    const { NULL_BYTES } = constants;

    describe('_transformERC20()', () => {
        let inputToken: TestMintableERC20TokenContract;
        let outputToken: TestMintableERC20TokenContract;
        let mintTransformer: TestMintTokenERC20TransformerContract;

        before(async () => {
            inputToken = await TestMintableERC20TokenContract.deployFrom0xArtifactAsync(
                artifacts.TestMintableERC20Token,
                env.provider,
                env.txDefaults,
                artifacts,
            );
            outputToken = await TestMintableERC20TokenContract.deployFrom0xArtifactAsync(
                artifacts.TestMintableERC20Token,
                env.provider,
                env.txDefaults,
                artifacts,
            );
            mintTransformer = await TestMintTokenERC20TransformerContract.deployFrom0xArtifactAsync(
                artifacts.TestMintTokenERC20Transformer,
                env.provider,
                env.txDefaults,
                artifacts,
            );
        });

        it("succeeds if taker's output token balance increases by exactly minOutputTokenAmount", async () => {
            const startingOutputTokenBalance = getRandomInteger(0, '100e18');
            const startingInputTokenBalance = getRandomInteger(0, '100e18');
            await outputToken.mint(taker, startingOutputTokenBalance).awaitTransactionSuccessAsync();
            await inputToken.mint(taker, startingInputTokenBalance).awaitTransactionSuccessAsync();
            const inputTokenAmount = getRandomPortion(startingInputTokenBalance);
            const minOutputTokenAmount = getRandomInteger(1, '1e18');
            const outputTokenMintAmount = minOutputTokenAmount;
            const receipt = await feature
                ._transformERC20(
                    NULL_BYTES,
                    taker,
                    inputToken.address,
                    outputToken.address,
                    inputTokenAmount,
                    minOutputTokenAmount,
                    [
                        {
                            transformer: mintTransformer.address,
                            tokens: [inputToken.address],
                            data: hexUtils.concat(
                                hexUtils.leftPad(outputToken.address),
                                hexUtils.leftPad(outputTokenMintAmount),
                                hexUtils.leftPad(taker),
                            ),
                        },
                    ],
                )
                .awaitTransactionSuccessAsync();
            verifyEventsFromLogs(
                receipt.logs,
                [
                    {
                        taker,
                        inputTokenAmount,
                        outputTokenAmount: outputTokenMintAmount,
                        inputToken: inputToken.address,
                        outputToken: outputToken.address,
                    },
                ],
                TransformERC20Events.TransformedERC20,
            );
        });
    });
});
