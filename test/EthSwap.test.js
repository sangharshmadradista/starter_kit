const { assert } = require('chai');

const EthSwap = artifacts.require("EthSwap"); 
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()
function tokens(n){
    return web3.utils.toWei(n, 'ether')
}
contract ('EthSwap Contract',  ( [sangharsh , sameer] ) => { // first name will be refrence to first ganache account and so on
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
  describe ('function buyToken(): to purchase DApp token from EthSwap Contract with Ether ', async () => {
      let etherCount, dappCountPerEth, initalDappCount,eventEmitted
     before (async () => {
        etherCount = '1'
        dappCountPerEth = etherCount * 100 // one ether is 100 DAppToken
        initalDappCount = await tokenContract.balanceOf(ethSwapContract.address)
        /*
            from: msg.sender
            value: msg.value 
         */
        eventEmitted = await ethSwapContract.buyToken({from: sameer, value: web3.utils.toWei(etherCount,'ether')})        
     }) 
    it ("has valid amount of DApptoken after purchase", async () => {
        let currentDAppToken = await tokenContract.balanceOf(sameer)
        currentDAppToken = currentDAppToken.toString()
        assert.equal(currentDAppToken , web3.utils.toWei(dappCountPerEth.toString(),'ether'))
    })
    it ("has valid amount of DApptoken reduced from EthSWap contract after the purchase", async () => {
        let tokenCount = await tokenContract.balanceOf(ethSwapContract.address)
        assert.equal(tokenCount.toString(), tokens('999900'))
    })
    it ("has valid amount of Ether in EthSwapContract after the purchase", async () => {
        let ethBalance = await web3.eth.getBalance(ethSwapContract.address)
        assert.equal(ethBalance.toString(), web3.utils.toWei('1', 'ether'))
    })
    it ("has emmitted all the properties as described", () => {
        const eventData = eventEmitted.logs[0].args
        assert.equal(eventData.sender, sameer)
        assert.equal(eventData.token, tokenContract.address)
        assert.equal(eventData.tokenCount.toString(), tokens('100'))
        assert.equal(eventData.exchangeRate.toString(), '100')
    })
  })
    
})

