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
  describe ('buyToken(): Purchsed DApp token from EthSwap contract with Ether ', async () => {
      let etherCount, dappCountPerEth, initalDappCount
     before (async () => {
        etherCount = '1'
        dappCountPerEth = etherCount * 100 // one ether is 100 DAppToken
        initalDappCount = await tokenContract.balanceOf(ethSwapContract.address)
        /*
            from: msg.sender
            value: msg.value 
         */
        await ethSwapContract.buyToken({from: sameer, value: web3.utils.toWei(etherCount,'ether')})        
     }) 
    it ("valid amount of DApptoken purchased", async () => {
        let currentDAppToken = await tokenContract.balanceOf(sameer)
        currentDAppToken = currentDAppToken.toString()
        assert.equal(currentDAppToken , web3.utils.toWei(dappCountPerEth.toString(),'ether'))
    })
    it ("valid amount of DApptoken reduced from EthSWap contract", async () => {
        let tokenCount = await tokenContract.balanceOf(ethSwapContract.address)
        assert.equal(tokenCount.toString(), tokens('999900'))
    })
    it ("valid amount of Eth with EthSwapContract", async () => {
        let ethBalance = await web3.eth.getBalance(ethSwapContract.address)
        assert.equal(ethBalance.toString(), web3.utils.toWei('1', 'ether'))
    })
  })
    
})

