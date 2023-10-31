const { expect } = require('chai')
const hre = require('hardhat')

describe('Rest Token Contract', function (){
    // global vars
    let Token, RestToken, owner, addr1, addr2, tokenCap, tokenBlockReward;
    tokenBlockReward = 50;
    tokenCap = 1000000000

    beforeEach(async function(){
        Token = await ethers.getContractFactory("RestToken");
        [owner, addr1, addr2] = await hre.ethers.getSigners()

        RestToken = await Token.deploy(tokenCap, tokenBlockReward)
    })
})

describe("Deployment", function () {
    it("Should set the right owner", async function(){
        expect(await RestToken.owner()).to.equal(owner.address)
    })
    it("Should assign the total supply of tokens to owner", async function () {
        const ownerBalance = await RestToken.balanceOf(owner.address)
        expect(await RestToken.totalSupply()).to.equal(ownerBalance)
    })
    it("Should set the max capped supply to the argument provided during deployment", async function (){
        const cap = await RestToken.cap();
        expect(await Number(hre.utils.formatEther(cap))).to.equal(tokenCap);
    })
    it("Should set block reward to argument provided during development", async function () {
        const blockReward = await RestToken.blockReward();
        expect(await Number(hre.utils.formatEther(blockReward))).to.equal(tokenTotalSupply)
    })
})

descibe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
        await RestToken.transfer(addr1.address, 50);
        const addr1Balance = await RestToken.balanceOf(addr1.address)
        expect(addr1Balance).to.equal(50)

        await RestToken.connect(addr1).transfer(addr2.address, 50)
        const addre2Balance = await RestToken.balanceOf(addr2.address)
        expect(addre2Balance).to.equal(50)
    })
})