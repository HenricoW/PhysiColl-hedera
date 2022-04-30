import { Button, Paper, Table, TableBody, TableContainer } from "@mui/material";
import { TableHead, TableRow, Typography } from "@mui/material";
import { ProductData } from "../../lib/utils/data-structs";
import { appName } from "../../pages/_app";
import TwoFieldTable, { StyledTableCell, StyledTableRow } from "../Tables/TwoFieldTable";

// temp
const imageData = [
  {
    name: "Photo 1",
    url: "ipfs/3d525412f521dabb6ac39b28e7605d9337b54718",
  },
  {
    name: "Photo 2",
    url: "ipfs/3d525412f521dabb6ac39b28e7605d9337b54718",
  },
  {
    name: "Photo 3",
    url: "ipfs/3d525412f521dabb6ac39b28e7605d9337b54718",
  },
  {
    name: "Photo 4",
    url: "ipfs/3d525412f521dabb6ac39b28e7605d9337b54718",
  },
  {
    name: "Verification Image",
    url: "ipfs/b6ac397b54718b23d525412f521dab8e7605d933",
  },
];
const contractData = [
  {
    name: "Original",
    url: "ipfs/bafybeicgmdpvw4duutrmdxl4a7gc52sxyuk7nz5gby77afwdteh3jc5bqa",
  },
  {
    name: "Minter signed",
    url: "ipfs/2f521dabb6ac39b3d5254128e7605d9337b54718",
  },
];
// end temp

interface NewMintMintProps {
  prodData: ProductData;
}

const fieldsToShow =
  "title brand modelName modelNumber year serialNumber description creator requestValue minValue".split(" ");
const fieldNames =
  "Title, Brand, Model Name, Model Number, Model Year, Serial Number, Description, Creator Address, Requested Value, Minimum Bid".split(
    ", "
  );
const fieldLookup: { [key: string]: string } = {};
for (let i = 0; i < fieldsToShow.length; i++) fieldLookup[fieldsToShow[i]] = fieldNames[i];

const imageTableTitles = ["Uploaded Images", "Image Location"];
const docTableTitles = ["Contract Copies", "Document Location"];
const LColLeftMargin = "4em";
const RColWidth = "70%";

const NewMintMint = ({ prodData }: NewMintMintProps) => {
  const pData: { [key: string]: any } = {
    ...prodData,
    requestValue: prodData.requestValue.toFixed(2),
    minValue: prodData.minValue.toFixed(2),
  };

  return (
    <>
      <Typography variant="h6">Review the Product data and confirm correctness.</Typography>
      <Typography variant="h6">
        If you are happy with the details captured, go ahead and mint its NFT to add it to the {appName} platform.
      </Typography>

      <TableContainer component={Paper} sx={{ m: "1em 0" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ ml: LColLeftMargin }}>Product detail</StyledTableCell>
              <StyledTableCell align="left" width={RColWidth}>
                Value
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(prodData)
              .filter((el) => fieldsToShow.includes(el))
              .map((okey) => (
                <StyledTableRow key={okey}>
                  <StyledTableCell align="left" sx={{ ml: LColLeftMargin }}>
                    {fieldLookup[okey]}
                  </StyledTableCell>
                  <StyledTableCell align="left">{pData[okey]}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TwoFieldTable titles={imageTableTitles} tableData={imageData} />

      <TwoFieldTable titles={docTableTitles} tableData={contractData} />

      <Button sx={{ display: "block", m: "2em auto" }} variant="contained" onClick={() => {}}>
        Confirm &amp; Mint NFT
      </Button>
    </>
  );
};

export default NewMintMint;
