//Normally we have 1.import, then 2.main function and 3.calling of the main function, but using hardhart deploy we are only going to import but we won't write and call main function, caus ewhen we run hardhat deploy, we set the default function that gets called
const { getNamedAccounts, deployments, network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
//a quick note that  this above line without the development chains is same as the 2 lines below const helperConfig =  require("../helper-hardhat-config") then 2nd line const networkConfig = helperConfig.networkConfig, And that's why we export the networkConfig in particular. But remember toask for just netwrkconfig we have to use {} and not (), Also since we've imported our network config we can now use the if statements of if chainId=4 use address blabla with the line lok below
// const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]  - so when we run yarn hardhat deploy --network rnkeby, the terminal goes to our code and uses that particular feedaddress from what we already wrote in our helperhardhat file
const { verify } = require("../utils/verify")//ffrom utils folder it was exported

module.exports = async ({ getNamedAccounts, deployments }) => {
    //hre is the hardhat rnuime environment so we can replace the getnamedaccounts and deployments with hre, but that slike the obshii file and we only need these 2 so it's better we use just the and pass them into he parentheses, so it's the same as saying hre.getNamedAccounts and hre.deployments. Everything being place don one line is what's known as javascript syntatic sugar
    const { deploy, log } = deployments //so we are pulling 2 functions as the deployment i.e the function deploy and func log
    const { deployer } = await getNamedAccounts() //when working with ethers we can get the account based on their numbers in regarding the listed accounts and don't forget first number is zero i.e we add namedaccounts to our config file and we get them from there, and this line of code once again means we are going to grab our deployer account from our named accounts
    const chainId = network.config.chainId
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress //normally this was supposed to be a const but since we've got different chains we need different pfeedaddresses which we register under this if else statement
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"] //so if we are not on a chain that means if we didn't deploy a mock we just use this line that was originally meant to be theonly line
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,//from our hardhat and || 1 means if no wait confirmation is provided we want ot wait for one block, and this wait is just soo etheres can catch up to us
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundme"]
