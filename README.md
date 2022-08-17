# Hardhat Fund Me

This is a section of the Javascript Blockchain/Smart Contract FreeCodeCamp Course.

*[⌨️ (10:00:48) Lesson 7: Hardhat Fund Me](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=36048s)*

[Full Repo](https://github.com/smartcontractkit/full-blockchain-solidity-course-js)

- [Hardhat Fund Me](#hardhat-fund-me)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
  - [Typescript](#typescript)
    - [Optional Gitpod](#optional-gitpod)
- [Usage](#usage)
  - [Testing](#testing)
    - [Test Coverage](#test-coverage)
- [Deployment to a testnet or mainnet](#deployment-to-a-testnet-or-mainnet)
  - [Scripts](#scripts)
  - [Estimate gas](#estimate-gas)
    - [Estimate gas cost in USD](#estimate-gas-cost-in-usd)
  - [Verify on etherscan](#verify-on-etherscan)
- [Linting](#linting)
- [Formatting](#formatting)
- [Thank you!](#thank-you)

This project is apart of the Hardhat FreeCodeCamp video.

# Getting Started

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` and get an ouput like: `vx.x.x`
- [Yarn](https://yarnpkg.com/getting-started/install) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` and get an output like: `x.x.x`
    - You might need to [install it with `npm`](https://classic.yarnpkg.com/lang/en/docs/install/) or `corepack`

## Quickstart

```
git clone https://github.com/PatrickAlphaC/hardhat-fund-me-fcc
cd hardhat-fund-me-fcc
yarn
```
npmignore is afile we put in documents we dont want to push in to npm if we want to change our file into a package

## Typescript

For the typescript edition, run:

```
git checkout typescript
```

### Optional Gitpod

If you can't or don't want to run and install locally, you can work with this repo in Gitpod. If you do this, you can skip the `clone this repo` part.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/PatrickAlphaC/hardhat-fund-me-fcc)

# Usage

Deploy:

```
yarn hardhat deploy
```

## Testing

```
yarn hardhat test
```

### Test Coverage

```
yarn hardhat coverage
```


# Deployment to a testnet or mainnet

1. Setup environment variables

You'll want to set your `KOVAN_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `KOVAN_RPC_URL`: This is url of the kovan testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)

2. Get testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Deploy

```
yarn hardhat deploy --network kovan
```

## Scripts

After deploy to a testnet or local net, you can run the scripts. 

```
yarn hardhat run scripts/fund.js
```

or
```
yarn hardhat run scripts/withdraw.js
```

## Estimate gas

You can estimate how much gas things cost by running:

```
yarn hardhat test
```

And you'll see and output file called `gas-report.txt`

### Estimate gas cost in USD

To get a USD estimation of gas cost, you'll need a `COINMARKETCAP_API_KEY` environment variable. You can get one for free from [CoinMarketCap](https://pro.coinmarketcap.com/signup). 

Then, uncomment the line `coinmarketcap: COINMARKETCAP_API_KEY,` in `hardhat.config.js` to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to have using coinmarketcap disabled until you need it. You can disable it by just commenting the line back out. 


## Verify on etherscan

If you deploy to a testnet or mainnet, you can verify it if you get an [API Key](https://etherscan.io/myapikey) from Etherscan and set it as an environemnt variable named `ETHERSCAN_API_KEY`. You can pop it into your `.env` file as seen in the `.env.example`.

In it's current state, if you have your api key set, it will auto verify kovan contracts!

However, you can manual verify with:

```
yarn hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

# Linting

We don't realy use this which is why it's deleted

Solhint is a solidity linter and it is the process of running a program to analyse the potential errors of this program, sometimes it does a little bit of formatting, eslint is a way to lint for jscript code and solhint is a way for solidity code
yarn solhint contracts/*.sol to run the code
To check linting / code formatting:
```
yarn lint
```
or, to fix: 
```
yarn lint:fix
```

# Formatting 

```
yarn format
```


# Thank you!

If you appreciated this, feel free to follow me or donate!

ETH/Polygon/Avalanche/etc Address: 0x9680201d9c93d65a3603d2088d125e955c73BD65

[![Patrick Collins Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/PatrickAlphaC)
[![Patrick Collins YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCn-3f8tw_E1jZvhuHatROwA)
[![Patrick Collins Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/patrickalphac/)
[![Patrick Collins Medium](https://img.shields.io/badge/Medium-000000?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@patrick.collins_58673/)


Working with a deploy script can be overwhelming cause not all of our scripts are being save , so the easy option is to download a package that eases everything for us
and this package is the hardhat deploy package
It's a plugin for repliccble deployments
yarn add --dev hardhat-deploy
 once deploying we add it to our hardhat config file, so since we've done that we can go ahead and delete our deploy.scripts, then we create a new deploy folder, and this is where our hardhat deploy function looks to check for our code and it's going to be where we write our code
 Since we are going to be using ethers a lot we also need to add hardhat-ethers to our packages
 we run yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers// so what we are doing is we are replacing the hardhat ethers we had before with hardhat deploy-ethers, so this helps ehters to keep track of our deploy,ents

 Mocking and helper-hardhat config
 Mocking is primarily used for unit testing, so in short mocking is creating objects that simulate the behavior of real objects, so for example when we were working with the priceconverter on remix we had to get an aggregator but that was cause we wwere online, but now being offline w eneed to mock it so we can access it from a localhost or hardhat network
 Now if we want to change chains? for example the address fpr eth/usd pricefeed on the mainnet is different from the one of the rinkeby testnet sinnce they are on different chains

The Aave network is one of the networks that run on multiple chains and they need to pass in different codes to these chains to mkae sure everything is okay, kinda similar to what we do with our aggregator pricefeed here, where we have different addresses for different chans, so to do this we create a new file helper-hardhat-config.js and this is where we define what address uses what

So after addding our chain ids to our helper hardhat we can now check the pricefeed using different network names, but theses are for onlne and for us to do it offline on a local host we need to create a mock file, check 00,after compiling our mock contract we can now deploy a fake blockchain with our contract


Quick tip, we would be working with a lot of solididty, you kow cause w emioght have to import from older versions and sometimes our compiler wouldn't match the versions of solidity we are using, so to fix this we just add different solidity versions in our file under config.js, 

One thing about hardhat is whenever we run yarn hardhat node we are gonna spin a new blockchain node that's already gonna have our deployed contracts on it

UTILS FOLDER
right after deploying our fund me on hardhatr we can do something similar to verifying our code using the If statement under our deploy contract so it's going to be like look below
If (
  !developmentChains.includes(network.name) && proces.env.ETHERSCAN_API_KEY//this means does not include and in my code it is teh chaind id thats used and not the network name
) {
  //verify, instead we add this verification scriptys to our utils folder as we dont want to have to add scripts to easch e=file whenever we have one
}

TESTNET DEMO
Just add name of network under our hardhat deploy and chose network when runningthe deploy script

SOLIDITY STYLE GUIDE
Low lwvel solidity
tweaking the code to make it look more professional and make your code look more nice, you add the style gide to the fund me.sol
and the main thing to look at is the order, i.e we are going to start with the 1pragma, then 2immport, 3interfaces, 4libraries, 5contracts
Then our NatSpec
which stands for Ethereum Natural Language Specification Format
And this is just a way of us documenting our code
so like adding comments to explaining what the contract entails in the fund me .sol
/**
*/
The reason we do this is cause we can automatically use the Natspec to create documentations for us, after downloading solc 
we can run solc --userdoc --devdoc example.sol//and this automatically generates our documentation


TESTING FUND ME
One o fthe advantages of writing these tests is so we can know how we can optimise our code to be faster, more gas efficient and what have you.
The bigger your project the more your tests
Types of tests
-Unit test- this is a software in which individual parts of our code are going to be tested, we unit t eest locally 
this can be done with:
--a local hardhat network, or
--a forked hardhat network
Staging test- this is the test if when we run our whole code on a test net  or soem actual network, it's also know as integration test, THE LAST STOP before deployment to a mainnet, not a 100% necessary but needed and can be really helpful


Breakpoints & Debugging
figuring out how to find the gasCost
we can create breakpoints in vscode, and what this allows us to do is to stop the code at that particualar time then passes us onto a debug console where we can see all the variables that are happening at that time.
so breakpoints are incredibly helpful for droping into tests and droping into scripts 
so after creatign a break point we can then create a new terminal on the jscript debug terminal and run our tesst but when we rtunthis on the terminal we hit a stop at the break point
the terminal is going to tell us thatdebugger has been attached and when we look at the variables section in the left hand side, we'd see a ton of the variables on the platform, on our debug  console we can type in transaction receipt and we'd see a lot of info regarding this, so under the variables we se that there is gas used and effective gas price so remember gas used * gasPrice = gasCost

GAS


console.log &debugging

of we are inside of a haredhat project we can just import hardhat/console.sol, and then in our solidity we can write console.log and alll that, so when we execute the function similar to jscript the console.logs just showcases to your terminal

TESTING\ FUNDME 2
withdrawing with ultiple funders

Storage in solidity

We can check our gas reports to see how much the aveerage gas for these contracts
Gas optimization techniques
in our fund me contracts when we save a global variable, they are stucked in something called storage, you can think of storage as a big giant array that actually stores all our global vars when we create them
in this storage each slot is 32 bytes long
so when we create the first global variable it gets slotted at the first spot and from on there, the next variable is going to be next slot and so on and so forth
for dynamic values i.e array or mapping, these are storeed using like a hashing function, the object itself gets a slot, but it's not going to have the complete properties or like numers in the object
The length of the array gets stored with  the array in the global storage but not the amount of things in them

But interestingly, constant or immutable variables do not take up storage, the reason for this is cause constant variables are like part of the contracts bytecode itaelf
also if we have variables inside of a function, those variables only exost within the function, they don't exist outside it
we need memory keyword for strings, caause strings are like a dynamic array

Check the test regarding the storage

Gas optimization using storage knowledge
any time we read/write to/fro of storage we spend a lot of gas
when we used remix and if we check the propperties of the fund me project, around the isde we find our abis and all that we cam see the opcodes, and each one of the bytecodes represent a part of the opcodes
In our hardhat artifacts in build info, we can see these opcpdes for diferent contract
these opcodes represent how much work the machine is doing and the represent the amount of computation work it takes to actually run our code and do stuff to our code
there's a git evm opcodes repo to see how much each opcodes cost
getting balance is 700
save word to storage costs 20000 SS
and load word costs 800// and these two are the most important opcodes
so any time we work with storage we spend a lot of gas 


so indicating in the code is helpful
i.e using i_owner for immmutable
and s_kjflksfdnns, for any globally stored variable to show that we are going to spend a ton of gas on this
internal and private are more gas effective

Solidity Chainlink Style Guide


Another gas optimization technique is to update all our requires with revert, cause with requires we are storing the massive string in our storage, but the error code is cheaper



Staging tests
under we use this itenary "?"
which is basically like a one line if sstatement
the consensus of how it works is look below

let variable = true
let someVar = variable ? "yes" : "no"// so here we are going to receive yes as an answer casue it is true, if it was false we get no as the answer

RUnning scripts on a local node
e

Adding scripts to package.json
in our package we can add this script section so it's easier for us to just run it in the terminal and this just saves us time by a far

Pushing to github