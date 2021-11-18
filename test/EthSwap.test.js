const { assert } = require('chai');

const EthSwap = artifacts.require("EthSwap"); 
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract ('EthSwap Contract',  () => {
    let ethSwapContract, tokenContract
    before( async () => {
    tokenContract = await Token.new()
    ethSwapContract = await EthSwap.new(tokenContract.address)
    })
  it ('is not null', async () => {
      assert.isNotNull(ethSwapContract)
  })
  it('has valid name',  async () => {
      const contractName =  await ethSwapContract.name()
      assert.equal(contractName, 'Eth Swap Finance')
  })
})

