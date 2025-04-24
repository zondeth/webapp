export interface Token {
    name: string;
    address: string;
    decimals: number;
    symbol: string;
    icon: string;
}

export const ZOND_TOKEN_LIST: Token[] = [
    {
        name: "ZND",
        address: "Z0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "ZND",
        icon: "/assets/images/tokens/znd.webp",
    },
    {
        name: "USDT",
        address: "Z0000000000000000000000000000000000000042",
        decimals: 18,
        symbol: "USDT",
        icon: "/assets/images/tokens/usdt.png",
    },
    {
        name: "Mock Token",
        address: "Z53ed437e5867e3e210c90e9353d3f0d022e34b9d",
        decimals: 18,
        symbol: "MOCK",
        icon: "/assets/images/tokens/usdc.png",
    },
]

export const EVM_TOKEN_LIST: Token[] = [
    {
        name: "ETH",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "ETH",
        icon: "/assets/images/tokens/eth.png",
    },
    {
        name: "USDT",
        address: "0x0000000000000000000000000000000000000042",
        decimals: 18,
        symbol: "USDT",
        icon: "/assets/images/tokens/usdt.png",
    },
    {
        name: "MockERC20",
        address: "0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519",
        decimals: 18,
        symbol: "MRC20",
        icon: "/assets/images/tokens/usdc.png",
    },
]