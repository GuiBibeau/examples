import { runTypeChain, glob } from "typechain";

async function main() {
  const cwd = process.cwd();
  // find all files matching the glob
  const allFiles = glob(cwd, [`./artifacts/contracts/**/*.json`]).filter(
    (x) => !x.includes(".dbg")
  );

  await runTypeChain({
    cwd,
    filesToProcess: allFiles,
    allFiles,
    outDir: "typechain",
    target: "ethers-v5",
  });
}

main().catch(console.error);
