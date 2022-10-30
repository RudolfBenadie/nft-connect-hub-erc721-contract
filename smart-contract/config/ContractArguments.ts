import { utils } from 'ethers';
import CollectionConfig from './CollectionConfig';

// Update the following array if you change the constructor arguments...
const ContractArguments = [
  CollectionConfig.tokenName,
  CollectionConfig.tokenSymbol,
  utils.parseEther(CollectionConfig.restrictedSale.price.toString()),
  CollectionConfig.maxSupply,
  CollectionConfig.restrictedSale.maxMintAmountPerTx,
  CollectionConfig.hiddenMetadataUri,
] as const;

export default ContractArguments;