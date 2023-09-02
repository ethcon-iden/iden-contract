// test/IdenIdentity.test.ts

import { ethers } from 'hardhat';
import { expect } from 'chai';
import { IdenIdentity } from '../typechain-types';

describe("IdenIdentity", function () {
  let idenIdentity: IdenIdentity;

  const setup = async () => {
    idenIdentity = await ethers.deployContract("IdenIdentity", []);
    await idenIdentity.waitForDeployment();
    console.log("IdenIdentity deployed to:", await idenIdentity.getAddress());
  }

  it("Should mint IdenIdentity", async function () {
    await setup();
    const [addr1] = await ethers.getSigners();

    console.log('addr1: ', await addr1.getAddress());

    const call = await idenIdentity.mintIdentity(addr1, "Title", "Summary", 100);
    await call.wait();

    const [accountTitle, accountSummary, reliabilityPoints] = await idenIdentity.getIdentity(addr1);
    expect(accountTitle).to.equal("Title");
    expect(accountSummary).to.equal("Summary");
    expect(reliabilityPoints).to.equal(100);
  });

  it("Should upgrade IdenIdentity", async function () {
    const [addr1] = await ethers.getSigners();

    console.log('addr1: ', await addr1.getAddress());

    const mintCall = await idenIdentity.mintIdentity(addr1, "Title", "Summary", 50);
    await mintCall.wait();
    const updateCall = await idenIdentity.updateIdentity(addr1, "Updated Title", "Updated Summary", 100);
    await updateCall.wait();

    const [accountsTitle, accountSummary, reliabilityPoints] = await idenIdentity.getIdentity(await addr1.getAddress());
    expect(accountsTitle).to.equal("Updated Title");
    expect(accountSummary).to.equal("Updated Summary");
    expect(reliabilityPoints).to.equal(100);
  });
});
