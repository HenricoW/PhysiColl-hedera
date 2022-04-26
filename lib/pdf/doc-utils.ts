import { PDFDocument, StandardFonts } from "pdf-lib";
import { ProductData } from "../utils/data-structs";

export const textWrapper = (text: string, charLimit: number = 80) => {
  if (text.length <= charLimit) return text;

  const multiples = Math.floor(text.length / charLimit);
  const slices = [];
  for (let i = 0; i <= multiples; i++) {
    let start = charLimit * i;
    slices[i] = text.slice(start, start + charLimit);
  }

  return slices.join("\n");
};

export const createContract = (data: ProductData) => {
  return new Promise<Buffer>(async (res, rej) => {
    try {
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.CourierBold);

      const page = doc.addPage();
      const createText = [
        "New PhysiColl Mint contract.\n",
        Array(80).fill("_").join("") + "\n\n",
        "PhysiColl creator address\t : " + data.creator + "\n\n",
        "Product details:\n",
        "Product title \t\t\t\t: " + data.title + "\n",
        "Product name & model \t\t : " + data.brand + " " + data.modelName + " " + data.modelNumber + "\n",
        "Product year & serial no. \t: " + data.year + ", " + data.serialNumber + "\n\n",
        "Product description:\n" + textWrapper(data.description) + "\n",
        "Selling range \t\t\t\t: " + "$ " + data.minValue.toFixed(2) + " to $ " + data.requestValue.toFixed(2) + "\n",
      ];

      const { height } = page.getSize();
      page.drawText(createText.join(""), {
        x: 50,
        y: height - 50,
        size: 10,
        lineHeight: 14,
        font,
      });

      // const fileName = data.brand + " " + data.modelName + " - " + shortAddress(data.creator).replace("...", "_");
      const docOS = await doc.save();
      const docBuffer = Buffer.from(docOS);

      res(docBuffer);
    } catch (err) {
      rej(err);
    }
  });
};
