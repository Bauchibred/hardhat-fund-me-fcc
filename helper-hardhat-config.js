const networkConfig = {
    31337: {
        name: "localhost",
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    42: {
        //this is the kovan test network
        name: "kovan",
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331", // then we get the price converter address and input it
    },
    4: {
        //maiiin network we are working on
        name: "rinkeby",
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
}

const developmentChains = ["hardhat", "localhost"] //so we can export to  our mock

module.exports = {
    networkConfig,
    developmentChains,
} // remember this is done so we are able to use it in our other files and to do that we need to export
