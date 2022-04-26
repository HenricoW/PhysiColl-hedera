import type { NextApiRequest, NextApiResponse } from "next";
import { createContract } from "../../lib/pdf/doc-utils";
import { ProductData } from "../../lib/utils/data-structs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: ProductData = req.body;

  createContract(data)
    .then((buff) => {
      res.setHeader("Content-Type", "application/pdf");
      res.status(200).send(buff);
    })
    .catch((err) => {
      console.log("Error generating file: ", err);
      res.status(500).send(err);
    });
}
