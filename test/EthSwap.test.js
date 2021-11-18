
const EthSwap = artifacts.require("EthSwap"); 

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract ('EthSwap Contract',  () => {
  it ('is not null', async () => {
    const ethSwapContract = await EthSwap.new()
      assert.isNotNull(ethSwapContract)
  })
  it('has valid name',  async () => {
    const ethSwapContract = await EthSwap.new()
      const contractName =  await ethSwapContract.name()
      //console.log(contractName)
      assert.equal(contractName, 'Eth Swap Finance')
  })
  
})

