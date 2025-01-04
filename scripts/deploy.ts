import { ethers, upgrades, network } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  console.log(owner.address);
  const BillCheap = await ethers.getContractFactory("BillCheap");
  console.log("Deploying BillCheap...");
  const billCheap = await upgrades.deployProxy(BillCheap, [owner.address], {
    initializer: "init_billcheap",
    initialOwner: owner.address,
  });
  await billCheap.waitForDeployment();
  const billCheapAddr = await billCheap.getAddress();
  console.log("Billcheap deployed to:", billCheapAddr);

  await billCheap.batchEnlistTokens([
    "0x39a325F4699a651fdcef4AA263F84c596cFe479d", // BNB
    "0x831F95093c67eD6D83112Ae5F78CDc649056380A", // ETH
    "0x11480C88d381A4C8adB29d84BFF032Ea3050d25A", // TUSD
    "0xaD85526A63168c2d25f26CFe15Ebbe6D82086cC6", // USDT
  ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
