const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
  const [deployer] = await ethers.getSigners();

  const SubNav = await ethers.getContractFactory("SubNav");
  const subNavInstance = new ethers.Contract(
    CONTRACT_ADDRESS,
    SubNav.interface,
    deployer
  );

  console.log("Connected to SubNav at address:", subNavInstance.address);

  subNavInstance.on("SubnetOwnershipRequest", (ownerAddress, subnetId, status) => {
    if (status == 'Pending') {
      console.log(`Address ${ownerAddress} requested ownership on subnet ${subnetId}`)
    }
  });

  while (true) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
