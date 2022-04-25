import { ChangeEvent, ReactNode, useState } from "react";
import { Box, Button, Card, FormControl, ImageList, ImageListItem, OutlinedInput } from "@mui/material";
import { InputAdornment, InputLabel } from "@mui/material";
import { Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { ProductData } from "../lib/utils/data-structs";
import NewMintContract from "../components/Steps/NewMintContract";

// temp
const walletAddr = "";
const imgSideLen = 180;
const minNoImgs = 3;
const maxNoImgs = 5;
const minValRate = 0.8;
// end temp

const initData: ProductData = {
  title: "",
  brand: "",
  modelName: "",
  modelNumber: "",
  year: 2000,
  serialNumber: "",
  description: "",
  creator: "",
  mintDate: 0,
  owner: "",
  backer: "",
  requestValue: 0,
  minValue: 0,
  backedVal: 0,
  backedDate: 0,
  imageURLs: [],
  contractURL: "",
};

const NewMint = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [prodData, setProdData] = useState<ProductData>({ ...initData, creator: walletAddr, owner: walletAddr });
  const [fileName, setFileName] = useState("");
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [uploadResponse, setUploadResponse] = useState("");
  const [imgUploadResponse, setImgUploadResponse] = useState("");
  const [docUploadResponse, setDocUploadResponse] = useState("");

  const onImgAdd = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      const theFile = e.target.files[0];
      setFileName(theFile.name ?? "");

      setImgFiles((imgs) => [theFile, ...imgs]);
      const blob = new Blob([theFile]);
      setImgURLs((urls) => [URL.createObjectURL(blob), ...urls]);
    }
  };

  const onDataUpdate = (key: keyof ProductData) => (e: ChangeEvent<HTMLInputElement>) => {
    let val: string | number;
    val = key === "requestValue" ? +e.target.value : e.target.value;
    setProdData((data) => ({ ...data, [key]: val }));
    if (key === "requestValue") setProdData((data) => ({ ...data, minValue: +e.target.value * minValRate }));
  };

  const uploadDisable = imgURLs.length === maxNoImgs;

  const stepContent = [
    {
      label: "Minting overview",
      body: (
        <>
          <Typography>Make sure your wallet is connected (click &quot;Connect&quot; in the top-right).</Typography>
          <Typography>The following steps will guide you through the process for minting a product.</Typography>
          <ol>
            <li>
              <Typography>Enter the details for the product you want to mint</Typography>
            </li>
            <li>
              <Typography>Add images to show the condition of the product</Typography>
            </li>
            <li>
              <Typography>
                Preview the contract (if it goes to sale) that will be used in the event of a sale
              </Typography>
            </li>
            <li>
              <Typography>Final review and payment</Typography>
            </li>
          </ol>
        </>
      ),
    },
    {
      label: "Product details",
      body: (
        <>
          <Typography sx={{ mt: "2.5em" }}>Please enter as much detail about the product as possible</Typography>
          <TextField
            label="Title"
            sx={{ mt: "1em" }}
            fullWidth
            variant="outlined"
            value={prodData.title}
            onChange={onDataUpdate("title")}
            required
          />
          <Box display="flex" gap="1em">
            <TextField
              label="Brand"
              sx={{ mt: "1em" }}
              fullWidth
              variant="outlined"
              placeholder="Eg: Samsung"
              value={prodData.brand}
              onChange={onDataUpdate("brand")}
              required
            />
            <TextField
              label="Model Name"
              sx={{ mt: "1em" }}
              fullWidth
              variant="outlined"
              placeholder="Eg: Galaxy S20"
              value={prodData.modelName}
              onChange={onDataUpdate("modelName")}
              required
            />
          </Box>
          <Box display="flex" gap="1em">
            <TextField
              label="Model Number"
              sx={{ mt: "1em" }}
              fullWidth
              variant="outlined"
              placeholder="Eg: SM-G980F"
              value={prodData.modelNumber}
              onChange={onDataUpdate("modelNumber")}
              required
            />
            <TextField
              label="Model Year"
              sx={{ mt: "1em" }}
              type="number"
              variant="outlined"
              required
              value={prodData.year}
              onChange={onDataUpdate("year")}
            />
            {/* <input type="number" min={1900} max={2022}></input> */}
            <TextField
              label="Serial Number"
              sx={{ mt: "1em" }}
              variant="outlined"
              value={prodData.serialNumber}
              onChange={onDataUpdate("serialNumber")}
            />
          </Box>
          <TextField
            label="Your wallet address"
            sx={{ mt: "1em" }}
            fullWidth
            disabled
            variant="outlined"
            value={walletAddr ? "" : "Please connect"}
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
        </>
      ),
    },
    {
      label: "Upload images",
      // TODO: Upload to storage in step (needed in next step)
      body: (
        <>
          <Typography mt="1em">
            Select between {minNoImgs} and {maxNoImgs} image files
          </Typography>
          <ImageList
            sx={{ height: imgSideLen, width: imgURLs.length * imgSideLen, m: "1em auto" }}
            cols={imgURLs.length}
            rowHeight={imgSideLen}
          >
            {imgURLs.map((url) => (
              <ImageListItem key={url}>
                <img src={url} width={imgSideLen} height={imgSideLen} loading="lazy" style={{ overflow: "hidden" }} />
              </ImageListItem>
            ))}
          </ImageList>
          {uploadResponse ? (
            <Box height="6em" display="flex" alignItems="center">
              <Typography m="0 auto" color="success.main" variant="h5">
                {uploadResponse}
              </Typography>
            </Box>
          ) : (
            <form onSubmit={() => {}}>
              <label htmlFor="upload-btn" style={{ textAlign: "center" }}>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-btn"
                  name="upload"
                  onChange={(e) => onImgAdd(e)}
                  disabled={uploadDisable}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ display: "block", width: "fit-content", margin: "1em auto 2em" }}
                  disabled={uploadDisable}
                >
                  Choose Image
                </Button>
              </label>
              {fileName ? (
                <Typography align="center" m="1em 0 .5em">
                  {fileName}
                </Typography>
              ) : null}
              <Button
                variant="outlined"
                color="error"
                sx={{ display: "block", width: "fit-content", margin: "1em auto 0" }}
                onClick={() => {
                  setImgFiles([]);
                  setImgURLs([]);
                }}
              >
                Reset
              </Button>
            </form>
          )}
        </>
      ),
    },
    {
      label: "Contract",
      // TODO: Prepop w/ img urls, desc data, upload orig. Also, sign & upload _s1 version
      body: <NewMintContract />,
    },
    {
      label: "Mint token",
      // TODO: mint nft
      body: (
        <>
          <Typography>Make sure your wallet is connected (click &quot;Connect&quot; in the top-right).</Typography>
          <Typography>The following steps will guide you through the process for minting a product.</Typography>
        </>
      ),
    },
  ];

  return (
    <Card
      sx={{
        p: "1.5em",
        m: "1em auto",
        backgroundColor: "#ccc",
        width: "60%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {stepContent.map((step) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: ReactNode;
            } = {};
            return (
              <Step key={step.label} {...stepProps}>
                <StepLabel {...labelProps}>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep !== stepContent.length ? (
          <>
            {/* Body */}
            <Box m="2em 1em">{stepContent[activeStep].body}</Box>

            {/* Buttons */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={() => setActiveStep((step) => step - 1)} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={() => {
                  setActiveStep((step) => step + 1);
                  console.log("prodData: ", prodData);
                }}
                disabled={activeStep === 2 && imgURLs.length < minNoImgs}
              >
                {activeStep === stepContent.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        ) : (
          <>
            {/* Body */}
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            {/* TODO: Add link to final contract upload location */}
            {/* TODO: Link to go back to Dashboard OR view product listings */}

            {/* Buttons */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={() => setActiveStep((step) => step - 1)} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={() => setActiveStep(0)}>Reset</Button>
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default NewMint;
