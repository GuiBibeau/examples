import { ethers } from "hardhat";
import { config } from "dotenv";

config();

async function main() {
  console.log(process.env);
  const Cage = await ethers.getContractFactory(process.env.CONTRACT_NAME!);
  const cage = await Cage.deploy(process.env.NFT_META_URL!);

  await cage.deployed();

  console.log("Greeter deployed to:", cage.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
