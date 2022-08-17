// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol";

//we can check this onlinr caus emost of the new aggregators come witha lready made mocks and ll we need to do is to check for this and edirt it to fit our codes, or we can use the module to our advantage
//so importing that chainlink repo is actually all we need to create our aggregator mock, cause importing is the same as copy pasta the code
//this file is just for us to create ou