const { expect } = require("chai");

describe("SubNav contract", function () {

  let SubNavContractFactory;
  let SubNav;
  let owner;
  let alice;
  let bob;
  let addrs;

  // User A
  let userAMail = "alice@mail.com"
  let userATwitter = "@alice"
  let userAPchainAddress = "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
  let userASignedControlKey = "eeab875587d2edefa27ddfce574dc8f7"

  // User B
  let userBMail = "bob@mail.com"
  let userBTwitter = "@bob"
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
    [owner, alice, bob, ...addrs] = await ethers.getSigners();

    SubNav = await SubNavContractFactory.deploy();

    await SubNav.deployed();
  });

  describe("User", function () {
    it("Should register a user", async function () {
      await SubNav.registerUser(userAMail, userATwitter);
    });

    it("Should return a user object based on its address", async function () {
      await SubNav.connect(alice).registerUser(userAMail, userATwitter);
      registeredUser = await SubNav.users(alice.address);

      expect(registeredUser.mail).to.equal(userAMail);
      expect(registeredUser.twitterHandle).to.equal(userATwitter);
    });

    it("Should add a signed Control Key to a user", async function () {
      await SubNav.connect(alice).addControlKeySig(userAPchainAddress, userASignedControlKey);
    });
  });

  describe("Subnet", function () {
    it("Should emit a subnet ownership request", async function () {
      await expect(SubNav.connect(alice).requestSubnetOwnership(subnetAId))
        .to.emit(SubNav, "SubnetOwnershipRequest")
        .withArgs(alice.address, subnetAId, "Pending");
    });

    it("Should register a subnet", async function () {
      await SubNav.connect(alice).requestSubnetOwnership(subnetAId);
      await SubNav.connect(alice).registerSubnet(subnetAId, subnetAName, subnetADescription);
      registeredSubnet = await SubNav.subnets(subnetAId);

      expect(registeredSubnet.name).to.equal(subnetAName);
    });

    it("Should fail to register a subnet", async function () {
      await expect(
        SubNav.connect(alice)
        .registerSubnet(subnetAId, subnetAName, subnetADescription)
      ).to.be.revertedWith("Sender is not the subnet owner")
    });

    it("Should return a subnet object based on its ID", async function () {
      await SubNav.connect(alice).requestSubnetOwnership(subnetAId);
      await SubNav.connect(alice).registerSubnet(subnetAId, subnetAName, subnetADescription);
      registeredSubnet = await SubNav.subnets(subnetAId);

      expect(registeredSubnet.name).to.equal(subnetAName);
      expect(registeredSubnet.description).to.equal(subnetADescription);
      expect(registeredSubnet.owner).to.equal(alice.address);
    });
  });

});
