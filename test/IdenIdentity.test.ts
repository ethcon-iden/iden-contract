// test/IdenIdentity.test.ts

import { ethers } from 'hardhat';
import { expect } from 'chai';
import { IdenIdentity } from '../typechain-types';

describe("IdenIdentity", function () {
  let idenIdentity: IdenIdentity;

  beforeEach(async () => {
    idenIdentity = await ethers.deployContract("IdenIdentity", []);
  });

  it("Should mint IdenIdentity", async function () {
    const [owner, addr1] = await ethers.getSigners();

    await idenIdentity.mintIdentity(addr1, "Title", "Summary", 100);
    const [accountTitle, accountSummary, reliabilityPoints] = await idenIdentity.getIdentity(addr1);
    expect(accountTitle).to.equal("Title");
    expect(accountSummary).to.equal("Summary");
    expect(reliabilityPoints).to.equal(100);
  });

  it("Should upgrade IdenIdentity", async function () {
    const [owner, addr1] = await ethers.getSigners();

    await idenIdentity.mintIdentity(addr1, "Title", "Summary", 50);
    await idenIdentity.updateIdentity(addr1, "Updated Title", "Updated Summary", 100);
    const [accountsTitle, accountSummary, reliabilityPoints] = await idenIdentity.getIdentity(await addr1.getAddress());
    expect(accountsTitle).to.equal("Updated Title");
    expect(accountSummary).to.equal("Updated Summary");
    expect(reliabilityPoints).to.equal(100);
  });
});
