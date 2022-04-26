import { ReactNode, useState } from "react";
import { Box, Button, Card, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { ProductData } from "../lib/utils/data-structs";
import NewMintContract from "../components/Steps/NewMintContract";
import NewMintOverview from "../components/Steps/NewMintOverview";
import NewMintForm from "../components/Forms/NewMintForm";
import NewMintImages from "../components/Steps/NewMintImages";
import NewMintMint from "../components/Steps/NewMintMint";

// temp
const walletAddr = "0x81745b7339d5067e82b93ca6bbad125f214525d3";
export const minNoImgs = 3;
// end temp

export const initData: ProductData = {
  title: "",
  brand: "",
  modelName: "",
  modelNumber: "",
  year: 2000,
  serialNumber: "",
  description: "",
  creator: walletAddr,
  mintDate: 0,
  owner: walletAddr,
  backer: "",
  requestValue: 0,
  minValue: 0,
  backedVal: 0,
  backedDate: 0,
  imageURLs: [],
  contractURL: "",
};

const NewMint = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>(initData);
  const [isDataValid, setIsDataValid] = useState(false);
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  // const [imgUploadResponse, setImgUploadResponse] = useState("");
  // const [docUploadResponse, setDocUploadResponse] = useState("");

  const stepContent = [
    {
      label: "Minting overview",
      body: <NewMintOverview />,
    },
    {
      label: "Product details",
      body: <NewMintForm setProductData={setProductData} setIsDataValid={setIsDataValid} />,
    },
    {
      label: "Upload images",
      // TODO: Upload to storage in step (needed in next step)
      body: <NewMintImages imgURLs={imgURLs} setImgURLs={setImgURLs} />,
    },
    {
      label: "Contract",
      // TODO: Prepop w/ img urls, desc data, upload orig. Also, sign & upload _s1 version
      body: <NewMintContract prodData={productData} />,
    },
    {
      label: "Mint token",
      // TODO: mint nft
      body: <NewMintMint />,
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
                onClick={() => setActiveStep((step) => step + 1)}
                disabled={(activeStep === 1 && !isDataValid) || (activeStep === 2 && imgURLs.length < minNoImgs)}
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
