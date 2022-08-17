// weonly do this sometimes we dont need to deploy mocks for rinkeby polygon or all onchain network, cause does already have these price feeds, also the setup of this file is similar to that of the deploy fundme
//but if you check it we have only 2 contracts at the time so for us to use this mock we've got to create a new contract in our contracts folder but adviasably we put them under a different folder that way we know that the contracts directly under contracts are our main projects
const { network } = require("hardhat") //since we are aasking for network in our async function

const DECIMALS = "8"
const INITIAL_PRICE = "200000000000" // 2000 and also we could do this in our helper hardhat and exported and there shouldn't be a problem
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // If we are on a local development network, we need to deploy mocks!
    if (chainId == 31337) {
        //the chain is stated cause we don't want to deploy this to a test net
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            //we await our mockV3Aggregator to get deployed
            contract: "MockV3Aggregator",
            from: deployer,
            log: true, //this just helps show on our terminal what stage of running it's at, like contract is deploying, the transaction id, where it was deploye dand  also how much gas was used and all that
            args: [DECIMALS, INITIAL_PRICE], //these are the arguments for our constructor you can check git to see what it takes as an arguement,
        })
        log("Mocks Deployed!")
        log("------------------------------------------------") // this just helps us to indicate that that's the help of this deploy script and anything else is from a different script
        log(
            "You are deploying to a local network, you'll need a local network running to interact"
        )
        log(
            "Please run `npx hardhat console` to interact with the deployed smart contracts!"
        )
        log("------------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
//this jsut hellps us incase we want to deploy only our mocke so we can run this code in our command line which is yarn hardhat deploy --tags mocks. that way our terminal just runs the any deployment with a mock tag
