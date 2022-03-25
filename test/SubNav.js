const { expect } = require("chai");

describe("SubNav contract", function () {

  let SubNavContractFactory;
  let SubNav;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // User A
  let userAMail = "alice@mail.com"
  let userATwitter = "@Alice"
  let userAPchainAddress = "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
  let userASignedControlKey = "eeab875587d2edefa27ddfce574dc8f7"

  // User B
  let userBMail = "bob@mail.com"
  let userBTwitter = "@Bob"
  let userBPchainAddress = "P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"
  let userBSignedControlKey = "e01096b9ffe3f416157f6ec46c467725"

  // Subnet A
  let subnetAId = "4vczxAbLhSpzypadHFEfY8Kn2kibhcZLQgoX9A34rAnADyXnp"
  let subnetAName = "Subnet A"
  let subnetADescription = "This is the description of Subnet A"
  let subnetAOwner = "Alice"

  // Subnet B
  let subnetBId = "Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ"
  let subnetBName = "Subnet B"
  let subnetBDescription = "This is the description of Subnet B"
  let subnetBOwner = "Bob"

  beforeEach(async function () {

    SubNavContractFactory = await ethers.getContractFactory("SubNav");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    SubNav = await SubNavContractFactory.deploy();

    await SubNav.deployed();
  });

  describe("User", function () {
    it("Should register a user", async function () {
      await SubNav.registerUser(userAMail, userATwitter);
    });

    it("Should add a signed Control Key to a user", async function () {
      await SubNav.connect(addr1).addControlKeySig(userAPchainAddress, userASignedControlKey);
    });
  });

  describe("Subnet", function () {
    it("Should register a subnet", async function () {
      await SubNav.registerSubnet(subnetAId, subnetAName, subnetADescription, subnetAOwner);
    });
  });

});
