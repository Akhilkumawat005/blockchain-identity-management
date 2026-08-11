import hre from "hardhat";

async function main() {
  console.log("Deploying IdentityRegistry contract...");

  // Access ethers directly from hardhat runtime environment
  const IdentityRegistry = await hre.ethers.getContractFactory("IdentityRegistry");
  const registry = await IdentityRegistry.deploy();

  await registry.waitForDeployment();

  const address = await registry.getAddress();
  console.log(`\n✅ IdentityRegistry deployed to: ${address}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});