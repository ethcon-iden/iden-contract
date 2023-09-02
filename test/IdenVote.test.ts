import { ethers } from 'hardhat';
import { expect } from 'chai';
import { IdenToken, IdenVote } from '../typechain-types';

describe("IdenSBT", function () {
  let idenToken: IdenToken;
  let idenVote: IdenVote;

  beforeEach(async () => {
    idenToken = await ethers.deployContract("IdenToken", [ethers.parseEther("1000")]);
    idenVote = await ethers.deployContract("IdenVote", [await idenToken.getAddress()]);

    await idenToken.mint(await idenVote.getAddress(), ethers.parseEther("100")); // Ensure deployer has enough IDEN tokens
  });

  it("Should mint IdenVote", async function () {
    const [owner, user1] = await ethers.getSigners();

    await idenVote.voteWithImpression(user1.address, "Great work!");
    expect(await idenVote.getVoteCount(user1.address)).to.equal(1);
  });
});