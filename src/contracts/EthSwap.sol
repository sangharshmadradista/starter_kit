pragma solidity ^0.5.0;
import "./Token.sol";


contract EthSwap {
	string public name = "Eth Swap Finance";
	Token public token;
	uint public ethExchangeRate = 100;

	//Event stores all the parameters passed in the blockchain
	//here we want to log address of account that purchased token, token address, token count and exchange rate
	event BuyToken(
		address sender,
		address token, 
		uint tokenCount, 
		uint ethExchangeRate
	); 

	event SellToken (
		uint dappTokenCount,
		uint ethCount,
		uint ethExchangeRate
	);

	constructor (Token _token) public {
		token = _token;
	}

	/* 
	payable : a modifier which allows ether to be received when called 
	msg: is the refrence to the object thats calling this contract
	 */
	function buyToken () public payable {
		uint value = msg.value * ethExchangeRate; 
		
		//validate EthSwap Contract has enough token to facilitate the transfer
		require(token.balanceOf(address(this)) >= value);

		token.transfer(msg.sender, value);

		//emit the event after succesfull transfer
		emit BuyToken(msg.sender, address(token), value, ethExchangeRate);
	}
	function sellToken (uint dappToken) public {
		/* Allows user to sell Dapp token
			Step 1: convert Dapp to ether	
		 */
		 uint etherCount = dappToken / ethExchangeRate;
		 emit SellToken (dappToken, etherCount, ethExchangeRate);

	}
}

