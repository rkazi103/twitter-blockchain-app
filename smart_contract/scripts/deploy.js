const hre = require("hardhat");

async function main() {
  const profileImageFactory = await hre.ethers.getContractFactory(
    "ProfileImageNfts"
  );
  const profileImageContract = await profileImageFactory.deploy();

  await profileImageContract.deployed();

  console.log(
    "Profile Image Minter deployed to:",
    profileImageContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
