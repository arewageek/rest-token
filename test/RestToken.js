const { expect } = require('chai')
const hre = require('hardhat')
const ethers = require('ethers')

describe('Rest Token Contract', function (){
    // global vars
    let Token, RestToken, owner, addr1, addr2, tokenCap, tokenBlockReward;
    tokenBlockReward = 50;
    tokenCap = 1000000000

    beforeEach(async function(){
        Token = await hre.ethers.getContractFactory("RestToken");
        [owner, addr1, addr2] = await hre.ethers.getSigners()

        RestToken = await Token.deploy(tokenCap, tokenBlockReward)
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
            expect(await Number(ethers.formatEther(cap))).to.equal(tokenCap);
        })
        it("Should set block reward to argument provided during development", async function () {
            const blockReward = await RestToken.blockReward();
            expect(await Number(ethers.formatEther(blockReward))).to.equal(tokenBlockReward)
        })
    })
    
    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // transfer tokens from contract owner to addr1
            await RestToken.transfer(addr1.address, 50);
            const addr1Balance = await RestToken.balanceOf(addr1.address)
            expect(addr1Balance).to.equal(50)
    
            // transfer tokens from addr1 to addr2 
            await RestToken.connect(addr1).transfer(addr2.address, 50)
            const addre2Balance = await RestToken.balanceOf(addr2.address)
            expect(addre2Balance).to.equal(50)
        })
    
        it("Should fail if sender doesn't have enough tokens", async function () {
            const initialOwnerBalance = await RestToken.balanceOf(owner.address)
    
            // sending 1 token from addr1 (0 tokens) to owner
            await expect(
                RestToken.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    
            // verify that owner's balance has not changed
            expect(await RestToken.balanceOf(owner.address).to.equal(initialOwnerBalance))
        })
    
        it("Should update balances after transfers", async function (){
            const initialOwnerBalance = await RestToken.balanceOf(owner.address)
    
            await RestToken.transfer(addr1.address, 200)
            await RestToken.transfer(addr2.address, 100)
    
            // check if owner's balance changed
            const finalOwnerBalance = await RestToken.balanceOf(owner.address)
            expect(finalOwnerBalance).to.equal(Number(initialOwnerBalance - (300 * await RestToken.decimals())))    
    
            // check if addr1 balance changed
            const addr1balance = await RestToken.balanceOf(addr1.address)
            expect(addr1balance).to.equal(200)
    
            const addr2balance = await RestToken.balanceOf(addr2.address)
            expect(addr2balance).to.equal(100)
        })
    })
})  