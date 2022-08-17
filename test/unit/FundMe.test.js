const { assert, expect } = require("chai") //importing assert from chai
const { network, deployments, ethers } = require("hardhat") // we're pulling this in so we can be able to deploy our fundme contract, adding ethers too
const { developmentChains } = require("../../helper-hardhat-config")
//know thtat we can group our test based on different functions
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", function () {
          let fundMe
          let mockV3Aggregator
          let deployer
          //kopohe theses lets are just so we can use these in the code
          //   const sendValue = "100000000000" this is us hardcoding the sendVAlue, or we can use the ether utilities
          const sendValue = ethers.utils.parseEther("1") //so this changes it to 1 and this helps us instead of typing the 16digits
          beforeEach(async () => {
              // const accounts = await ethers.getSigners(),if we use this it's going to give us the list of account in our networks, if we run this while on hardhat that measn we are going to get a list of ten fake accounts that we can work with
              // deployer = accounts[0], then now we attach deployer to one particular account that way we know which one we are using
              deployer = (await getNamedAccounts()).deployer //we get the deployer from the getNAmedAccounts as in our former deploy script, and we just import the getNamedAccounts from hardhat, then we connect the deployer to the fund me accoutn as done in 2 lines below and whenever we call our fund me the account gets attached to it
              await deployments.fixture(["all"]) //just this one line deploys everything in our deploy folder cause we already added the all tag, and after deploying all our contracts we can start getting them with the lines below
              fundMe = await ethers.getContract("FundMe", deployer) //hardhat ethers has a getContract feature, this is used to get the most recent contract of whatever is pased in the parentheses
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })

          describe("constructor", function () {
              it("sets the aggregator addresses correctly", async () => {
                  const response = await fundMe.getPriceFeed()
                  assert.equal(response, mockV3Aggregator.address) //if this test gets completed it means we are assigning the pricefeed address same with mock aggregatorV3 address
              })
          })

          describe("fund", function () {
              //our test for funding
              // https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
              // could also do assert.fail
              it("Fails if you don't send enough ETH", async () => {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      //we are expect to be reverted with, so our code doesn't break while running the test adn so it brings back the written error
                      "You need to spend more ETH!"
                  )
              })
              // we could be even more precise here by making sure exactly $50 works
              // but this is good enough for now
              it("Updates the amount funded data structure", async () => {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getAddressToAmountFunded(
                      deployer
                  )
                  assert.equal(response.toString(), sendValue.toString()) // so this checks if our send value is same with our big =Number gotten from line 47
                  //also don't forget that to run a particular test you can use the grep and add a tag word e.g
                  //   yarn hardhat test --grep "amount funded"- this runs the test for our amount funded only
              })
              it("Adds funder to array of funders", async () => {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getFunder(0)
                  assert.equal(response, deployer)
              })
          })
          describe("withdraw", function () {
              //a new describe for a different function
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue })
              }) //this is added so we make sure the contract has been funded before actually running the withdrawal tests
              it("withdraws ETH from a single funder", async () => {
                  // here we use the arrange, act, assert order this is sort of a way to actually assess tests so you want to follow the order, look below
                  // Arrange
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  //we are getting these two starting balances so we can test later on, how much these balances have changed after callling our withdrawal function
                  // Act
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1) //so we wait for the transaction to go through
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice) //explanation below

                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  // Assert
                  // Maybe clean up to understand the testing
                  assert.equal(endingFundMeBalance, 0) //cause we just withdrew all the money
                  //   assert.equal(
                  //       startingFundMeBalance.add(startingDeployerBalance),
                  //       endingDeployerBalance
                  //   )- this assertation does not take into account the gas costs but this is pretty basic, sfmb +sdb = edb, since we've withdrawn everything, also we are using bigNumber.add() causer it makes working with big numbers a bit easier so ideally we should add the gasCost and then change the answer to a stringstartingFundMeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance.add(gasCost).toString()
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
              // this test is overloaded. Ideally we'd split it into multiple tests
              // but for simplicity we left it as one
              it("is allows us to withdraw with multiple funders", async () => {
                  // Arrange
                  const accounts = await ethers.getSigners()
                  for (i = 1; i < 6; i++) {
                      // we are looping through the funders account, we are strating with i as an index 1 cause at index 0 is the deployer's address
                      const fundMeConnectedContract = await fundMe.connect(
                          accounts[i]
                      ) // we need to create this to i think connect these accounts, since under our fund me function we linked the accounts with, so we need to create new objects to conect all this accounts
                      await fundMeConnectedContract.fund({ value: sendValue })
                  }
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  // Act
                  const transactionResponse = await fundMe.cheaperWithdraw()
                  // Let's compare gas costs :)
                  // const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait()
                  const { gasUsed, effectiveGasPrice } = transactionReceipt // the curly bracket syntax is so we can pull out one object out of another
                  const withdrawGasCost = gasUsed.mul(effectiveGasPrice) //.mul  is a bignumber function instead if the native *, this makes it easier for us to work with big numbers
                  console.log(`GasCost: ${withdrawGasCost}`)
                  console.log(`GasUsed: ${gasUsed}`)
                  console.log(`GasPrice: ${effectiveGasPrice}`)
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  // Assert
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(withdrawGasCost).toString()
                  )
                  // Make a getter for storage variables,
                  await expect(fundMe.getFunder(0)).to.be.reverted
                  // to make sure that all the funded amount gets resetted back to zero
                  for (i = 1; i < 6; i++) {
                      assert.equal(
                          await fundMe.getAddressToAmountFunded(
                              accounts[i].address
                          ),
                          0
                      ) // so we are making sure that our mapping are correctly updated to zero
                  }
              })
              it("Only allows the owner to withdraw", async function () {
                  const accounts = await ethers.getSigners()
                  const fundMeConnectedContract = await fundMe.connect(
                      accounts[1] //get our first acount
                  )
                  await expect(
                      fundMeConnectedContract.withdraw()
                  ).to.be.revertedWith("FundMe__NotOwner") //tx is going to be reverted with our contract error
              })
          })
      })
