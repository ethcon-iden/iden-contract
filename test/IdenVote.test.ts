import { ethers } from 'hardhat';
import { expect } from 'chai';
import { IdenToken, IdenVote } from '../typechain-types';

describe("IdenSBT", function () {
  let idenToken: IdenToken;
  let idenVote: IdenVote;

  beforeEach(async () => {
    idenToken = await ethers.deployContract("IdenToken", [ethers.parseEther("1000")]);
    await idenToken.waitForDeployment();
    console.log("IdenToken deployed to:", await idenToken.getAddress());

    idenVote = await ethers.deployContract("IdenVote", [await idenToken.getAddress()]);
    await idenVote.waitForDeployment();
    console.log("IdenVote deployed to:", await idenVote.getAddress());

    const mint = await idenToken.mint(await idenVote.getAddress(), ethers.parseEther("100")); // Ensure deployer has enough IDEN tokens
    await mint.wait();
  });

  it("Should mint IdenVote", async function () {
    const [user1] = await ethers.getSigners();

    const vote = await idenVote.voteWithImpression(user1.address, "Great work!");
    await vote.wait();
    expect(await idenVote.getVoteCount(user1.address)).to.equal(1);
  });
});