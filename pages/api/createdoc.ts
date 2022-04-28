import type { NextApiRequest, NextApiResponse } from "next";
import { createContract, createS1Doc } from "../../lib/utils/doc-utils";
import { ProductData } from "../../lib/utils/data-structs";

interface Data {
  prodData: ProductData;
  addr: string;
  sig: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: Data = req.body;
  const { prodData, addr, sig } = data;

  try {
    const buffer = addr && sig ? await createS1Doc(prodData, addr, sig) : await createContract(prodData);
    res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(buffer);
  } catch (err) {
    console.log("Error generating file: ", err);
    res.status(500).json({ message: "Error generating file: " + err });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
