import { ethers, upgrades, network } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const BillCheap = await ethers.getContractFactory("BillCheap");
  console.log("Upgrading BillCheap...");
  const billCheap = await upgrades.upgradeProxy(
    "0xe105272E6678045193C18E8D043122CcE7095e7C",
    BillCheap
  );
  await billCheap.waitForDeployment();
  const billCheapAddr = await billCheap.getAddress();
  console.log("BillCheap upgraded to:", billCheapAddr);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
