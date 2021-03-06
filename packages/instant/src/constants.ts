import { BigNumber } from '@0x/utils';

import { AccountNotReady, AccountState, AffiliateInfo, Network, ProviderType } from './types';

// TODO(dave4506) until we have /prices endpoint ready, we will use this whitelist for bridge order liquidity assets
export const SUPPORTED_TOKEN_ASSET_DATA_WITH_BRIDGE_ORDERS = [
    '0xf47261b0000000000000000000000000e41d2489571d322189246dafa5ebde1f4699f498', // ZRX
    '0xf47261b0000000000000000000000000960b236a07cf122663c4303350609a66a7b288c0', // ANT
    '0xf47261b00000000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef', // BAT
    '0xf47261b0000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    '0xf47261b00000000000000000000000006b175474e89094c44da98b954eedeac495271d0f', // DAI
    '0xf47261b000000000000000000000000005f4a42e251f2d52b8ed15e9fedaacfcef1fad27', // ZIL
    '0xf47261b000000000000000000000000058b6a8a3302369daec383334672404ee733ab239', // LPT
    '0xf47261b00000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a2', // MKR
    '0xf47261b0000000000000000000000000d26114cd6ee289accf82350c8d8487fedb8a0c07', // OMG
    '0xf47261b0000000000000000000000000514910771af9ca656af840dff83e8264ecf986ca', // LINK
    '0xf47261b00000000000000000000000001985365e9f78359a9b6ad760e32412f4a445e862', // REP
];
export const BIG_NUMBER_ZERO = new BigNumber(0);
export const ETH_DECIMALS = 18;
export const DEFAULT_ZERO_EX_CONTAINER_SELECTOR = '#zeroExInstantContainer';
export const INJECTED_DIV_CLASS = 'zeroExInstantResetRoot';
export const INJECTED_DIV_ID = 'zeroExInstant';
export const OVERLAY_DIV_CLASS = 'zeroExInstantOverlay';
export const OVERLAY_CLOSE_BUTTON_DIV_CLASS = 'zeroExInstantOverlayCloseButton';
export const MAIN_CONTAINER_DIV_CLASS = 'zeroExInstantMainContainer';
export const WEB_3_WRAPPER_TRANSACTION_FAILED_ERROR_MSG_PREFIX = 'Transaction failed';
export const GWEI_IN_WEI = new BigNumber(1000000000);
export const ONE_SECOND_MS = 1000;
export const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
export const GIT_SHA = process.env.GIT_SHA;
export const NODE_ENV = process.env.NODE_ENV;
export const NPM_PACKAGE_VERSION = process.env.NPM_PACKAGE_VERSION;
export const DEFAULT_UNKOWN_ASSET_NAME = '???';
export const ACCOUNT_UPDATE_INTERVAL_TIME_MS = ONE_SECOND_MS * 5;
export const SWAP_QUOTE_UPDATE_INTERVAL_TIME_MS = ONE_SECOND_MS * 15;
export const DEFAULT_GAS_PRICE = GWEI_IN_WEI.multipliedBy(6);
export const DEFAULT_ESTIMATED_TRANSACTION_TIME_MS = ONE_MINUTE_MS * 2;
export const MAGIC_TRIGGER_ERROR_INPUT = '0€';
export const MAGIC_TRIGGER_ERROR_MESSAGE = 'Triggered error';
export const ETH_GAS_STATION_API_BASE_URL = 'https://ethgasstation.info';
export const HEAP_ANALYTICS_ID = process.env.HEAP_ANALYTICS_ID;
export const HEAP_ENABLED = process.env.HEAP_ENABLED;
export const COINBASE_API_BASE_URL = 'https://api.coinbase.com/v2';
export const PROGRESS_STALL_AT_WIDTH = '95%';
export const PROGRESS_FINISH_ANIMATION_TIME_MS = 200;
export const HOST_DOMAINS_EXTERNAL = [
    '0x-instant-staging.s3-website-us-east-1.amazonaws.com',
    '0x-instant-dogfood.s3-website-us-east-1.amazonaws.com',
    'instant.0xproject.com',
    'instant.0x.org',
];
export const HOST_DOMAINS_LOCAL = ['localhost', '127.0.0.1', '0.0.0.0'];
export const ROLLBAR_CLIENT_TOKEN = process.env.ROLLBAR_CLIENT_TOKEN;
export const ROLLBAR_ENABLED = process.env.ROLLBAR_ENABLED;
export const INSTANT_DISCHARGE_TARGET = process.env.INSTANT_DISCHARGE_TARGET as
    | 'production'
    | 'dogfood'
    | 'staging'
    | undefined;
export const COINBASE_WALLET_IOS_APP_STORE_URL = 'https://itunes.apple.com/us/app/coinbase-wallet/id1278383455?mt=8';
export const COINBASE_WALLET_ANDROID_APP_STORE_URL = 'https://play.google.com/store/apps/details?id=org.toshi&hl=en';
export const COINBASE_WALLET_SITE_URL = 'https://wallet.coinbase.com/';
export const META_MASK_FIREFOX_STORE_URL = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
export const META_MASK_CHROME_STORE_URL =
    'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';
export const META_MASK_OPERA_STORE_URL = 'https://addons.opera.com/en/extensions/details/metamask/';
export const META_MASK_SITE_URL = 'https://metamask.io/';
export const ETHEREUM_NODE_URL_BY_NETWORK = {
    [Network.Mainnet]: `https://mainnet.infura.io/v3/${process.env.INSTANT_INFURA_PROJECT_ID}`,
    [Network.Kovan]: `https://kovan.infura.io/v3/${process.env.INSTANT_INFURA_PROJECT_ID}`,
};
export const ZERO_EX_SITE_URL = 'https://www.0x.org/';
export const BLOCK_POLLING_INTERVAL_MS = 10000; // 10s
export const NO_ACCOUNT: AccountNotReady = {
    state: AccountState.None,
};
export const LOADING_ACCOUNT: AccountNotReady = {
    state: AccountState.Loading,
};
export const LOCKED_ACCOUNT: AccountNotReady = {
    state: AccountState.Locked,
};
export const PROVIDER_TYPE_TO_NAME: { [key in ProviderType]: string } = {
    [ProviderType.Cipher]: 'Cipher',
    [ProviderType.MetaMask]: 'MetaMask',
    [ProviderType.Mist]: 'Mist',
    [ProviderType.CoinbaseWallet]: 'Coinbase Wallet',
    [ProviderType.Parity]: 'Parity',
    [ProviderType.TrustWallet]: 'Trust Wallet',
    [ProviderType.Opera]: 'Opera Wallet',
    [ProviderType.Fortmatic]: 'Fortmatic',
    [ProviderType.Fallback]: 'Fallback',
};
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEFAULT_AFFILIATE_INFO: AffiliateInfo = {
    feeRecipient: NULL_ADDRESS,
    feePercentage: 0,
};

export const FORTMATIC_API_KEY = process.env.INSTANT_FORTMATIC_API_KEY;
