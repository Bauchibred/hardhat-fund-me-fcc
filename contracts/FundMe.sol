// SPDX-License-Identifier: MIT
// 1. Pragma
pragma solidity ^0.8.0;
// 2. Imports
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";//on remix we could run just this but using hardhat we have to install @chainlink/coontracts packages first using yarn add --dev @chainlink/contracts
import "./PriceConverter.sol";

// 3. Interfaces, Libraries, Contracts
error FundMe__NotOwner();//common practise to add the naem of your contract then the error

/**@title A sample Funding Contract
 * @author Patrick Collins
 * @notice This contract is for creating a sample funding contract
 * @dev This implements price feeds as our library
 */
contract FundMe {
    // Type Declarations, following the order of our contracts from the solididty style guide, we can see that the type declarations are what come first, but we dont have any except that we are using our price converter fo uint 256 type
    using PriceConverter for uint256;

    // State variables, next in the order
    uint256 public constant MINIMUM_USD = 50 * 10**18;//public cause we want people to know the min usd they can deposit to our contract
    address private immutable i_owner;//i_owner is more gas efective, nd private cause it's not really important for people to know who our owner is, but aftere setting it as private w ehave to use getters and return the i_owner so that we can access it in the code i think
    address[] private s_funders;//private aswell
    mapping(address => uint256) private s_addressToAmountFunded;
    AggregatorV3Interface private s_priceFeed;//procefeed is a storage variable so as developers we should know that we're spending a lot of gas on this cause of the s prefix so must helpful is to find and replace all the storage variables so we add the s

    // Events (we have none!)

    // Modifiers
    modifier onlyOwner() {
        // require(msg.sender == i_owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();//update revert from NotOwner to FundMe_NotOwner, this way if we ever run to an error we know it's from our fund me contract
        _;
    }

    // Functions Order:
    // constructor
    // receive
    // fallback
    // external
    // public
    // internal
    // private
    // view / pure

    constructor(address priceFeed) {//the constructor function is  the function that automatically gets called  when we deploy our contract, also in regards to the address of the pricefeed they have to be different for different chains remember.
        s_priceFeed = AggregatorV3Interface(priceFeed);//
        i_owner = msg.sender;
    }

    /// we'd remove the title and author here since we stated it already earlier in this contract @notice Funds our contract based on the ETH/USD price
    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH!"
        );
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        // Transfer vs call vs Send
        // payable(msg.sender).transfer(address(this).balance);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function cheaperWithdraw() public onlyOwner {//this cheaper withdrawal is much more gas efficient compared to our former function where we kept reading from storage thereby costing us more gas, since we don't want to always contqacting the storage, so the best thing to do is to create an address array with a memory, amd memory is going to be a lot cheaper
        address[] memory funders = s_funders;//so since we've stored it to our memory variable, we can now read from this costing us cheaper
        // mappings can't be in memory, sorry!
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];//here we are using our memory array
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);//new address array of zero
        // payable(msg.sender).transfer(address(this).balance);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    /** @notice Gets the amount that an address has funded
     *  @param fundingAddress the address of the funder
     *  @return the amount funded
     */
    function getAddressToAmountFunded(address fundingAddress)
        public
        view
        returns (uint256)
    {
        return s_addressToAmountFunded[fundingAddress];
    }

    function getVersion() public view returns (uint256) {
        return s_priceFeed.version();// cause this was set to private
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
//the reason why we do this is cause we as developers want to know that this is a storage variable and want to be careful while deaing with it, but we don't want people who interact with our code to go through the stress.