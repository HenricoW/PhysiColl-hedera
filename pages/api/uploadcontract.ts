import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    keepExtensions: true,
    maxFiles: 2,
    maxFileSize: 1024 ** 2,
    filter: function ({ mimetype }) {
      return mimetype ? mimetype.includes("pdf") : false;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Could not parse files" });
      return;
    }

    console.log("uploaded files: ", Object.keys(files));
    res.status(200).json({ message: "Documents uploaded successfully" });
  });
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
