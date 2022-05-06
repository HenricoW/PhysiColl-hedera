import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { ProductData } from "../../lib/utils/data-structs";
import { isValidPData } from "../../lib/utils/tools";
import { initData } from "../../pages/newmint";
import FormField from "./FormField";

// temp
const walletAddr = "0x81745b7339d5067e82b93ca6bbad125f214525d3";
const minValRate = 0.8;
// end temp

interface NewMintFormProps {
  setProductData: (pData: ProductData) => void;
  setIsDataValid: (val: boolean) => void;
}

export const requiredNumberEntries = ["year", "requestValue", "offeredRate", "payoutPeriod", "noUnits"];

const NewMintForm = ({ setProductData, setIsDataValid }: NewMintFormProps) => {
  const [prodData, setProdData] = useState<ProductData>(initData);
  const [btnText, setBtnText] = useState("Save Data");

  const onDataUpdate = (key: keyof ProductData) => (e: ChangeEvent<HTMLInputElement>) => {
    const val: string | number = requiredNumberEntries.includes(key) ? +e.target.value : e.target.value;

    setProdData((data) => ({ ...data, [key]: val }));
    if (key === "requestValue") setProdData((data) => ({ ...data, minValue: +e.target.value * minValRate }));
  };

  const onPayPeriod = (numDays: number) => setProdData((data) => ({ ...data, payoutPeriod: numDays }));

  const onSave = () => {
    // TODO: data validation
    console.log("is valid data?: ", isValidPData(prodData));
    setIsDataValid(false);

    if (isValidPData(prodData)) {
      setIsDataValid(true);
      setProductData(prodData);
    }
  };

  return (
    <>
      <Typography sx={{ mt: "2.5em" }}>Please enter as much detail about the product as possible</Typography>
      {FormField("Title", prodData.title, onDataUpdate("title"), true)}
      <Box display="flex" gap="1em">
        {FormField("Brand", prodData.brand, onDataUpdate("brand"), true, "Eg: Samsung")}
        {FormField("Model Name", prodData.modelName, onDataUpdate("modelName"), true, "Eg: Galaxy S20")}
      </Box>
      <Box display="flex" gap="1em">
        {FormField("Model Number", prodData.modelNumber, onDataUpdate("modelNumber"), true, "Eg: SM-G980F")}
        {FormField("Model Year", prodData.year, onDataUpdate("year"), false)}
        {/* <input type="number" min={1900} max={2022}></input> */}
        {FormField("Serial Number", prodData.serialNumber, onDataUpdate("serialNumber"), false)}
      </Box>
      <TextField
        label="Your wallet address"
        sx={{ mt: "1em" }}
        fullWidth
        disabled
        variant="outlined"
        value={walletAddr ? walletAddr : "Please connect"}
      />
      <Box display="flex" gap="1em" alignItems="center" mt=".5em" flexWrap="wrap">
        <Typography m=".5em 0 0 auto">Requested value: </Typography>
        <FormControl sx={{ mt: ".5em", width: "10em" }}>
          <InputLabel htmlFor="reqAmount">Amount</InputLabel>
          <OutlinedInput
            id="reqAmount"
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            required
            value={prodData.requestValue}
            onChange={onDataUpdate("requestValue")}
          />
        </FormControl>

        <Typography m=".5em 0 0 auto">Split offering: </Typography>
        <FormControl sx={{ mt: ".5em", width: "8em" }}>
          <InputLabel htmlFor="unitCount">Number of Units</InputLabel>
          <OutlinedInput
            id="unitCount"
            type="number"
            endAdornment={<InputAdornment position="end">Units</InputAdornment>}
            label="Number of Units"
            required
            value={prodData.noUnits}
            onChange={onDataUpdate("noUnits")}
          />
        </FormControl>

        <Typography m=".5em 0 0 auto">Offering Annual Rate: </Typography>
        <FormControl sx={{ mt: ".5em", width: "8em" }}>
          <InputLabel htmlFor="intRate">Annual Rate</InputLabel>
          <OutlinedInput
            id="intRate"
            type="number"
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Annual Rate"
            required
            value={prodData.offeredRate}
            onChange={onDataUpdate("offeredRate")}
          />
        </FormControl>

        <Typography m=".5em 0 0 auto">Interest payout period: </Typography>
        <FormControl sx={{ mt: ".5em", width: "10em" }}>
          <InputLabel htmlFor="payPeriod">Every # days</InputLabel>
          <Select
            value={prodData.payoutPeriod}
            label="Every # days"
            onChange={(e) => {
              onPayPeriod(+e.target.value);
            }}
          >
            <MenuItem value={7}>7 days</MenuItem>
            <MenuItem value={14}>14 days</MenuItem>
            <MenuItem value={30}>30 days</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField
        label="Product description"
        sx={{ mt: "1em" }}
        fullWidth
        multiline
        rows={4}
        required
        value={prodData.description}
        onChange={onDataUpdate("description")}
      />
      <Button variant="contained" sx={{ display: "block", m: "1.5em auto 0" }} onClick={onSave}>
        {btnText}
      </Button>
    </>
  );
};

export default NewMintForm;
