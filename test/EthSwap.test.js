const { assert } = require('chai');

const EthSwap = artifacts.require("EthSwap"); 
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract ('EthSwap Contract',  ( [sangharsh , sameer] ) => { // first name will be refrecee to first ganache account and so on
    let ethSwapContract, tokenContract
    before( async () => {
    tokenContract = await Token.new()
    ethSwapContract = await EthSwap.new(tokenContract.address)
    await tokenContract.transfer(ethSwapContract.address,'1000000000000000000000000')
    })
  it ('is not null', async () => {
      assert.isNotNull(ethSwapContract)
  })
  it('has valid name',  async () => {
      const contractName =  await ethSwapContract.name()
      assert.equal(contractName, 'Eth Swap Finance')
  })
  describe ('buyToken()', async () => {
      let etherCount, dappCount
     before (async () => {
        etherCount = '1'
        dappCount = etherCount * 100 // one ether is 100 DAppToken
        /*
            from: msg.sender
            value: msg.value 
         */
        await ethSwapContract.buyToken({from: sameer, value: web3.utils.toWei(etherCount,'ether')})        
     }) 
    it ("valid amount of token purchased", async () => {
        let currentDAppToken = await tokenContract.balanceOf(sameer)
        currentDAppToken = currentDAppToken.toString()
        assert.equal(currentDAppToken , web3.utils.toWei(dappCount.toString(),'ether'))
    })
  })
    
})

