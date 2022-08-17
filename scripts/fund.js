const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
  const { deployer } = await getNamedAccounts()
  const fundMe = await ethers.getContract("FundMe", deployer)
  console.log(`Got contract FundMe at ${fundMe.address}`)
  console.log("Funding contract...")
  const transactionResponse = await fundMe.fund({
    value: ethers.utils.parseEther("0.1"),
  })
  await transactionResponse.wait()
  console.log("Funded!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })


  //we can use this in the future if we just want to fund our contracts  
  //script is pretty basic, remember to import everything you use
  //e can run the scripts by using yarn hardhat run scripts/fund.js --network localhost