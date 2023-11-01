// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// async function main() {
//   const RestToken = await hre.ethers.getContractFactory('RestToken')
//   const restToken = await RestToken.deploy(100000000, 50)

//   await restToken.deployed()

// }
//   console.log(`Rest Token has been deployed: ${restToken.address}`);

async function main(){
  const [deployer] = await hre.ethers.getSigners();
  const RestToken = await hre.ethers.getContractFactory("RestToken");

  const restToken = await RestToken.deploy(100000000, 50, { from: deployer.address })

  // await restToken.deploy();
  await restToken.deployTransaction


  console.log("Successfully deployed contract on Sepolia Testnet", restToken)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
