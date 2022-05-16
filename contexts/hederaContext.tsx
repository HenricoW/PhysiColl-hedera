import { HashConnect, HashConnectTypes, MessageTypes } from "hashconnect";
import { FC, ReactNode, createContext, useState, useEffect } from "react";
import { SaveData } from "../lib/utils/data-structs";

type Networks = "testnet" | "mainnet" | "previewnet";

interface hederaContextType {
  connect: () => void;
  walletData: SaveData;
  netWork: Networks;
  metaData?: HashConnectTypes.AppMetadata;
  installedExtensions: HashConnectTypes.WalletMetadata | null;
}

const defaults: hederaContextType = {
  connect: () => null,
  walletData: {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedAccounts: [],
    pairedWalletData: null,
    netWork: "testnet",
  },
  netWork: "testnet",
  installedExtensions: null,
};

const hederaContext = createContext<hederaContextType>(defaults);

const APP_CONFIG: HashConnectTypes.AppMetadata = {
  name: "PhysiColl dApp",
  description: "Under collateralized loans through Ricardian contracts",
  icon: "",
};

interface hederaContextProps {
  children: ReactNode;
  hashConnect: HashConnect;
  netWork: Networks;
  metaData?: HashConnectTypes.AppMetadata;
  debug?: boolean;
}

const HederaProvider: FC<hederaContextProps> = ({ children, hashConnect, netWork, metaData, debug }) => {
  const [saveData, setSaveData] = useState<SaveData>(defaults.walletData);
  const [installedExtensions, setInstalledExtensions] = useState<HashConnectTypes.WalletMetadata | null>(null);

  const connect = () => {
    if (installedExtensions) {
      if (debug) console.log("Pairing String::", saveData.pairingString);
      hashConnect.connectToLocalWallet(saveData?.pairingString);
    } else {
      if (debug) console.log("====No Extension is not in browser====");
      return "wallet not installed";
    }
  };

  const loadLocalData = (): null | SaveData => {
    let foundData = localStorage.getItem("hashconnectData");

    if (foundData) {
      const saveData: SaveData = JSON.parse(foundData);
      // setSaveData(saveData);
      return saveData;
    } else return null;
  };

  const initializeHashConnect = async () => {
    const saveData = defaults.walletData;
    const localData = loadLocalData();
    try {
      if (!localData) {
        if (debug) console.log("===Local data not found.=====");

        //first init and store the private for later
        let initData = await hashConnect.init(metaData ?? APP_CONFIG);
        saveData.privateKey = initData.privKey;

        //then connect, storing the new topic for later
        const state = await hashConnect.connect();
        saveData.topic = state.topic;

        //generate a pairing string, which you can display and generate a QR code from
        saveData.pairingString = hashConnect.generatePairingString(state, netWork, debug ?? false);

        //find any supported local wallets
        hashConnect.findLocalWallets();
      } else {
        if (debug) {
          console.log("====Local data found====", localData);
        }
        //use loaded data for initialization + connection
        hashConnect.init(metaData ?? APP_CONFIG, localData?.privateKey);
        hashConnect.connect(localData?.topic, localData?.pairedWalletData ?? metaData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (localData) {
        setSaveData((prevData) => ({ ...prevData, ...localData }));
      } else {
        setSaveData((prevData) => ({ ...prevData, ...saveData }));
      }
      if (debug) console.log("====Wallet details updated to state====");
    }
  };

  const onFoundExtension = (data: HashConnectTypes.WalletMetadata) => {
    if (debug) console.debug("====foundExtensionEvent====", data);
    setInstalledExtensions(data);
  };

  const saveToLocalStorage = (data: MessageTypes.ApprovePairing) => {
    if (debug) console.info("===============Saving to localstorage::=============");
    const { metadata, ...restData } = data;
    setSaveData((prevSaveData) => {
      prevSaveData.pairedWalletData = metadata;
      return { ...prevSaveData, ...restData };
    });
    let dataToSave = JSON.stringify(data);
    localStorage.setItem("hashconnectData", dataToSave);
  };

  const onPairing = (data: MessageTypes.ApprovePairing) => {
    if (debug) console.log("====pairingEvent:::Wallet connected=====", data);
    // Save Data to localStorage
    saveToLocalStorage(data);
  };

  useEffect(() => {
    initializeHashConnect();

    // Attach event handlers
    // hashConnect.additionalAccountResponseEvent.on(additionalAccountResponseEventHandler);
    hashConnect.foundExtensionEvent.on(onFoundExtension);
    hashConnect.pairingEvent.on(onPairing);

    return () => {
      // Detach existing handlers
      // hashConnect.additionalAccountResponseEvent.off(additionalAccountResponseEventHandler);
      hashConnect.foundExtensionEvent.off(onFoundExtension);
      hashConnect.pairingEvent.off(onPairing);
    };
  }, []);

  return (
    <hederaContext.Provider
      value={{
        connect,
        netWork,
        walletData: saveData,
        installedExtensions,
      }}
    >
      {children}
    </hederaContext.Provider>
  );
};

export default hederaContext;

export { HederaProvider };
