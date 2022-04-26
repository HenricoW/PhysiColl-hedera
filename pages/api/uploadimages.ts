import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    keepExtensions: true,
    uploadDir: "images",
    filter: function ({ mimetype }) {
      return mimetype ? mimetype.includes("image") : false;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "could not parse files" });
      return;
    }

    res.status(200).send({});
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
