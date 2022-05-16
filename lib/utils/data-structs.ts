import { HashConnectTypes } from "hashconnect";

export interface ProductData {
  title: string;
  brand: string;
  modelName: string;
  modelNumber: string;
  year: number;
  serialNumber: string;
  description: string;
  creator: string;
  mintDate: number; // skip at form
  owner: string;
  backer: string; // skip at form
  requestValue: number;
  offeredRate: number;
  payoutPeriod: number;
  noUnits: number;
  unitsBacked: number; // skip at form
  imageURLs: string[]; // skip at form
  contractURLs: string[]; // skip at form
}

export interface SaveData {
  topic: string;
  pairingString: string;
  privateKey: string;
  pairedWalletData: HashConnectTypes.WalletMetadata | null;
  pairedAccounts: string[];
  netWork?: string;
  id?: string;
  accountIds?: string[];
}
