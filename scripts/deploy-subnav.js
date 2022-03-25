async function main() {

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  const SubNav = await ethers.getContractFactory("SubNav");
  const subNavInstance = await SubNav.deploy();
  await subNavInstance.deployed();

  console.log("SubNav address:", subNavInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
