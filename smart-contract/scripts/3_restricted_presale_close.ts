import NftContractProvider from '../lib/NftContractProvider';

async function main() {
  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();

  // Disable restricted sale (if needed)
  if (await contract.restrictedPresaleMintEnabled()) {
    console.log("Disabling restricted presale...");

    await (await contract.setRestrictedPresaleMintEnabled(false)).wait();
  }

  console.log("Restricted presale has been disabled!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
