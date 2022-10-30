import NftContractProvider from '../lib/NftContractProvider';

async function main() {
  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();

  // Disable restricted sale (if needed)
  if (await contract.restrictedMintEnabled()) {
    console.log('Disabling restricted sale...');

    await (await contract.setRestrictedMintEnabled(false)).wait();
  }

  console.log('Restricted sale has been disabled!');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
