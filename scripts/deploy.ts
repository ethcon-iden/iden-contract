import { ethers } from "hardhat";

async function main() {

  const totalAmount = ethers.parseEther("1000");
  const idenToken = await ethers.deployContract("IdenToken", [totalAmount]);

  await idenToken.waitForDeployment();

  const idenTokenAddress = await idenToken.getAddress();
  console.log("IdenToken deployed to:", idenTokenAddress);

  const idenVote = await ethers.deployContract("IdenVote", [idenTokenAddress]);
  await idenVote.waitForDeployment();

  console.log("IdenVote deployed to:", await idenVote.getAddress());

  const idenIdentity = await ethers.deployContract("IdenIdentity", []);
  await idenIdentity.waitForDeployment();

  console.log("IdenIdentity deployed to:", await idenIdentity.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
