import { requiredNumberEntries } from "../../components/Forms/NewMintForm";
import { ProductData } from "./data-structs";

export const shortAddress = (addr: string, numChars: number = 4) =>
  addr.slice(0, numChars + 2) + "..." + addr.slice(-1 * numChars);

export const isValidPData = (data: ProductData) => {
  const d: { [key: string]: number | string | string[] } = data as any;
  const toSkipAtForm = ["mintDate", "backer", "unitsBacked", "imageURLs", "contractURLs"];

  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
    if (toSkipAtForm.includes(keys[i])) continue;

    const val = d[keys[i]];
    console.log("value in fn: ", keys[i], ": ", val);
    if (requiredNumberEntries.includes(keys[i]) && val <= 0) return false;
    if (keys[i] === "year" && val < 1900) return false;
    if (typeof val === "string" && val.length < 2) return false;
  }

  return true;
};
