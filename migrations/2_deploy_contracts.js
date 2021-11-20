const EthSwap = artifacts.require("EthSwap"); 
const Token = artifacts.require("Token");

module.exports =  async function(deployer) { 

  await deployer.deploy(Token);
  const tokenContract = await Token.deployed()
  const tokenValue = await tokenContract.totalSupply()

  // since EthSwap requires Token contract, we are passing the address of this contract as a refrence to where this contract is deployed in blockchain
  await deployer.deploy(EthSwap, tokenContract.address); 
  const ethSwapContract = await EthSwap.deployed() 

  await tokenContract.transfer(ethSwapContract.address,tokenValue)
};
