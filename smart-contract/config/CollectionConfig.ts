import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import * as Networks from "../lib/Networks";
import * as Marketplaces from "../lib/Marketplaces";
import whitelistAddresses from "./whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumTestnet,
  mainnet: Networks.ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: "NFTConnectHub",
  tokenName: "NFT Connect Hub - Genesis collection",
  tokenSymbol: "NFTCHGC",
  hiddenMetadataUri: "ipfs://QmUyaRiBARaej5pJhjy92GyUUC2eSaZ3nt3dNjuKATVeBY/Guess Who.json",
  maxSupply: 3377,
  restrictedSale: {
    price: 0.02,
    maxMintAmountPerTx: 10,
  },
  preSale: {
    price: 0.02,
    maxMintAmountPerTx: 10,
  },
  publicSale: {
    price: 0.03,
    maxMintAmountPerTx: 10,
  },
  contractAddress: "0x9338ec005b52e14eF87A9388A4b40321C14c3524",
  marketplaceIdentifier: "nftch-genesis",
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
