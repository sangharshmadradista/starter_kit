const EthSwap = artifacts.require("EthSwap"); 
const Token = artifacts.require("Token");

module.exports =  async function(deployer) { 

  await deployer.deploy(EthSwap); 
  const ethSwapContract = await EthSwap.deployed() 

  await deployer.deploy(Token);
  const tokenContract = await Token.deployed() 
  await tokenContract.transfer(ethSwapContract.address,'1000000000000000000000000')
};
