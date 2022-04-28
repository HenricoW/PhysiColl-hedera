import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    keepExtensions: true,
    maxFiles: 6,
    maxFileSize: 3 * 1024 ** 2,
    uploadDir: "images",
    filter: function ({ mimetype }) {
      return mimetype ? mimetype.includes("image") : false;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Could not parse files" });
      return;
    }

    console.log("form files: ", Object.keys(files));
    res.status(201).json({ message: "Successfully uploaded files" });
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
