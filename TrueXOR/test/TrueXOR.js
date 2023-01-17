const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("TrueXOR", function () {
  async function deployAll() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const TrueXOR = await ethers.getContractFactory("TrueXOR");
    const trueXOR = await TrueXOR.deploy();

    const TrueXORAttack = await ethers.getContractFactory("TrueXORAttack");
    const trueXORAttack = await TrueXORAttack.deploy();

    trueXORAttackAddress = trueXORAttack.address;

    return { owner, trueXOR, trueXORAttackAddress };
  }

  describe("callMe function revert TRUE", function () {
    it("Attack with even number of gas", async function () {
      const { owner, trueXOR, trueXORAttackAddress } = await loadFixture(
        deployAll
      );
      GAS_LIMIT = 300000;
      expect(
        await trueXOR
          .connect(owner)
          .callMe(trueXORAttackAddress, { gasLimit: GAS_LIMIT })
      ).to.equal(true);
    });
    it("Attack with not even number of gas", async function () {
      const { owner, trueXOR, trueXORAttackAddress } = await loadFixture(
        deployAll
      );
      GAS_LIMIT = 300001;
      expect(
        await trueXOR
          .connect(owner)
          .callMe(trueXORAttackAddress, { gasLimit: GAS_LIMIT })
      ).to.equal(true);
    });
  });
});
