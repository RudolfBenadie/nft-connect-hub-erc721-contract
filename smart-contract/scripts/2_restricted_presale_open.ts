import { utils } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import CollectionConfig from '../config/CollectionConfig';
import NftContractProvider from '../lib/NftContractProvider';

async function main() {
  // Check configuration
  if (CollectionConfig.whitelistAddresses.length < 1) {
    throw new Error(
      "\x1b[31merror\x1b[0m " +
      "The restricted list is empty, please add some addresses to the configuration."
    );
  }

  // Build the Merkle Tree
  const leafNodes = CollectionConfig.whitelistAddresses.map((addr) =>
    keccak256(addr)
  );
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = "0x" + merkleTree.getRoot().toString("hex");

  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();

  // Update sale price (if needed)
  const restrictedSalePrice = utils.parseEther(
    CollectionConfig.restrictedSale.price.toString()
  );
  if (!await (await contract.cost()).eq(restrictedSalePrice)) {
    console.log(
      `Updating the token price to ${CollectionConfig.restrictedSale.price} ${CollectionConfig.mainnet.symbol}...`
    );

    await (await contract.setCost(restrictedSalePrice)).wait();
  }

  // Update max amount per TX (if needed)
  if (!await (await contract.maxMintAmountPerTx()).eq(CollectionConfig.restrictedSale.maxMintAmountPerTx)) {
    console.log(
      `Updating the max mint amount per TX to ${CollectionConfig.restrictedSale.maxMintAmountPerTx}...`
    );

    await (await contract.setMaxMintAmountPerTx(CollectionConfig.restrictedSale.maxMintAmountPerTx)).wait();
  }

  // Update root hash (if changed)
  if ((await contract.merkleRoot()) !== rootHash) {
    console.log(`Updating the root hash to: ${rootHash}`);

    await (await contract.setMerkleRoot(rootHash)).wait();
  }

  // Enable restricted sale (if needed)
  if (!await contract.restrictedPresaleMintEnabled()) {
    console.log("Enabling restricted presale...");

    await (await contract.setRestrictedPresaleMintEnabled(true)).wait();
  }

  console.log("Restricted presale has been enabled!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
