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
  maxSupply: 25,
  restrictedSale: {
    price: 0.005,
    maxMintAmountPerTx: 10,
  },
  preSale: {
    price: 0.005,
    maxMintAmountPerTx: 10,
  },
  publicSale: {
    price: 0.01,
    maxMintAmountPerTx: 10,
  },
  contractAddress: "0xC8B19A48201DC7Aa67205e06501A00A8f1a2Ff5C",
  marketplaceIdentifier: "nftch-genesis",
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
