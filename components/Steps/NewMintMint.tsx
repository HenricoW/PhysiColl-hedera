import { Button, Link, Paper, styled, Table, TableBody, TableCell, TableContainer } from "@mui/material";
import { tableCellClasses, TableHead, TableRow, Typography } from "@mui/material";
import { ProductData } from "../../lib/utils/data-structs";
import { appName } from "../../pages/_app";

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

const gatewayPrefix = "https://ipfs.infura.io/";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#bfbfbf",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#ccc",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const NewMintMint = ({ prodData }: NewMintMintProps) => {
  const pData: { [key: string]: any } = prodData;

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
              <StyledTableCell sx={{ ml: "4em" }}>Product detail</StyledTableCell>
              <StyledTableCell align="left" width="70%">
                Value
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(prodData)
              .filter((el) => fieldsToShow.includes(el))
              .map((okey) => (
                <StyledTableRow key={okey}>
                  <StyledTableCell align="left" sx={{ ml: "4em" }}>
                    {fieldLookup[okey]}
                  </StyledTableCell>
                  <StyledTableCell align="left">{pData[okey]}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ m: "1em 0" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ ml: "4em" }}>Uploaded Images</StyledTableCell>
              <StyledTableCell align="left" width="70%">
                Image Location
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {imageData.map((iData) => (
              <StyledTableRow key={iData.name}>
                <StyledTableCell align="left" sx={{ ml: "4em" }}>
                  {iData.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Link href={gatewayPrefix + iData.url} target="_blank">
                    {iData.url}
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ m: "1em 0" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ ml: "4em" }}>Contract Copies</StyledTableCell>
              <StyledTableCell align="left" width="70%">
                Document Location
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractData.map((cData) => (
              <StyledTableRow key={cData.name}>
                <StyledTableCell align="left" sx={{ ml: "4em" }}>
                  {cData.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Link href={gatewayPrefix + cData.url} target="_blank">
                    {cData.url}
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button sx={{ display: "block", m: "2em auto" }} variant="contained" onClick={() => {}}>
        Confirm &amp; Mint NFT
      </Button>
    </>
  );
};

export default NewMintMint;
