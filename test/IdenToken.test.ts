import { ethers } from "hardhat";
import { expect } from 'chai';
import { IdenToken } from "../typechain-types";

describe("IdenToken", function () {
  let idenToken: IdenToken;

  beforeEach(async () => {
    idenToken = await ethers.deployContract("IdenToken", [ethers.parseEther("1000")]);
  });

  it("Should mint IdenToken", async function () {
    const [owner] = await ethers.getSigners();
    expect(await idenToken.balanceOf(owner)).to.equal(ethers.parseEther("1000"));
    await idenToken.mint(owner, ethers.parseEther("100"));
    expect(await idenToken.balanceOf(owner)).to.equal(ethers.parseEther("1100"));
  });
});