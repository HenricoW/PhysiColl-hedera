import { Box, Button, Divider, IconButton, OutlinedInput, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import type { NextPage } from "next";
import { ReactNode, useState } from "react";
import { storeData } from "../lib/utils/temp_data";
import { mintlist } from "./mymints";
// temp
const listingData = storeData[1];
const walletAddr = "0x81745b7339d5067e82b93ca6bbad125f214525d3";
const qtyAvailable = 3;
const qtyTotal = 5;
// end temp

const qtyStepper = (val: number, onChg: (delta: number) => void, endAdornment?: ReactNode) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => onChg(-1)}>
        <RemoveCircleIcon fontSize="large" color="primary" />
      </IconButton>
      <OutlinedInput value={val} endAdornment={endAdornment} sx={{ width: "6em" }} />
      <IconButton onClick={() => onChg(1)}>
        <AddCircleIcon fontSize="large" color="primary" />
      </IconButton>
    </Box>
  );
};

const MintDetail: NextPage = () => {
  const [qty, setQty] = useState(1);

  const qtyChange = (delta: number) => {
    console.log(qty);
    if (qty + delta > qtyAvailable || qty + delta < 1) return;

    setQty((qty) => qty + delta);
  };

  return (
    <>
      <Box fontWeight="fontWeightLight" fontSize="h4.fontSize" className="title">
        Mint details
      </Box>
      <Box mt="2em" display="flex" justifyContent="space-around" gap="2em" flexWrap="wrap">
        <Box maxWidth="700px">
          <img src={mintlist[0].image} width="100%" />
        </Box>

        <Box maxWidth="900px">
          <Typography mb=".5em" fontSize="1.8em">
            {listingData.title}
          </Typography>
          <Typography mb="1em" variant="h6">
            Minter: {walletAddr}
          </Typography>

          <Divider sx={{ my: "1em" }} />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography fontSize="1.8em">
                $ {listingData.requestValue} @ {9.35}%
              </Typography>
              <Typography variant="h6">
                {qtyAvailable + "/" + qtyTotal} Units available at $ {listingData.requestValue / qtyTotal} each
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap="1em">
              {qtyStepper(qty, qtyChange, "Units")}
              <Typography variant="h5">for $ {(qty * listingData.requestValue) / qtyTotal}</Typography>
              <Button variant="contained">Back Now</Button>
            </Box>
          </Box>
          <Divider sx={{ my: "1em" }} />

          <Typography fontWeight="bold">Description:</Typography>
          <Typography mb="2em">{listingData.description}</Typography>
          <Typography fontWeight="bold">Product details:</Typography>
          <table>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Brand and model:</td>
                <td>{listingData.brand + ", " + listingData.modelName}</td>
              </tr>
              <tr>
                <td>Year and model number:</td>
                <td>{listingData.year + ", " + listingData.modelNumber}</td>
              </tr>
              <tr>
                <td>Requested Amount:</td>
                <td>{listingData.requestValue}</td>
              </tr>
              <tr>
                <td>Backed Amount:</td>
                <td>{0}</td>
              </tr>
              <tr>
                <td>Offered Rate:</td>
                <td>{9} %</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </>
  );
};

export default MintDetail;
