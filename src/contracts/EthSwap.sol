pragma solidity ^0.5.0;
import "./Token.sol";


contract EthSwap {
	string public name = "Eth Swap Finance";
	Token public token;
	uint public ethExchangeRate = 100; 

	constructor (Token _token) public {
		token = _token;
	}

	/* 
	payable : a modifier which allows ether to be received when called 
	msg: is the refrence to the object thats calling this contract
	 */
	function buyToken () public payable {
		uint value = msg.value * ethExchangeRate; 
		token.transfer(msg.sender, value);
	}
}

