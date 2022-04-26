import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { ProductData } from "../../lib/utils/data-structs";
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

const NewMintForm = ({ setProductData, setIsDataValid }: NewMintFormProps) => {
  const [prodData, setProdData] = useState<ProductData>(initData);

  const onDataUpdate = (key: keyof ProductData) => (e: ChangeEvent<HTMLInputElement>) => {
    let val: string | number;
    val = key === "requestValue" ? +e.target.value : e.target.value;
    setProdData((data) => ({ ...data, [key]: val }));
    if (key === "requestValue") setProdData((data) => ({ ...data, minValue: +e.target.value * minValRate }));
  };

  const onSave = () => {
    // TODO: data validation
    setIsDataValid(true);

    setProductData(prodData);
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
      <Box display="flex" gap="1em" alignItems="center" mt=".5em">
        <Typography m=".5em 0 0 auto">Requested value: </Typography>
        <FormControl sx={{ mt: ".5em", width: "12em" }}>
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
      </Box>
      <Typography textAlign="right" color="text.secondary">
        Min. backing value: $ 2800
      </Typography>
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
        Save Data
      </Button>
    </>
  );
};

export default NewMintForm;
