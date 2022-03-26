const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
let subnetAId = "RmpZ419FexVANhoYGoqHis2sKFnpX5SxEFfmXxjkeHdm9FJzh"
let subnetAName = "Subnet A"
let subnetADescription = "This is the description of Subnet A"
let subnetAOwner = "Alice"

// Subnet B
let subnetBId = "22cwG7XXFk2ZMEAm5b1HwKr66PtrA28Nm3rzSY5VSNLLtoSQQv"
let subnetBName = "Subnet B"
let subnetBDescription = "This is the description of Subnet B"
let subnetBOwner = "Bob"

async function main() {

  const [deployer] = await ethers.getSigners();

  const SubNav = await ethers.getContractFactory("SubNav");
  const subNavInstance = new ethers.Contract(CONTRACT_ADDRESS, SubNav.interface, deployer);

  [owner, alice, bob, ...addrs] = await ethers.getSigners();

  // Register two users
  await subNavInstance.connect(alice).registerUser(userAMail, userATwitter);
  await subNavInstance.connect(bob).registerUser(userBMail, userBTwitter);
  console.log("Registered mock Users");

  // Request two subnets ownerships
  await subNavInstance.connect(alice).requestSubnetOwnership(subnetAId);
  await subNavInstance.connect(bob).requestSubnetOwnership(subnetBId);
  console.log("Created and validated subnets ownership requests");

  // Register two subnets
  await subNavInstance.connect(alice).registerSubnet(subnetAId, subnetAName, subnetADescription);
  await subNavInstance.connect(bob).registerSubnet(subnetBId, subnetBName, subnetBDescription);
  console.log("Registered mock Subnets");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
