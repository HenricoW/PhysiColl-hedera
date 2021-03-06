import { ReactNode, useState } from "react";
import { Box, Button, Card, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { ProductData } from "../lib/utils/data-structs";
import NewMintContract from "../components/Steps/NewMintContract";
import NewMintOverview from "../components/Steps/NewMintOverview";
import NewMintForm from "../components/Forms/NewMintForm";
import NewMintImages from "../components/Steps/NewMintImages";
import NewMintMint from "../components/Steps/NewMintMint";
import { appName } from "./_app";

// TODO: sub components handle 'Next' btn activation

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
  offeredRate: 0,
  payoutPeriod: 0,
  noUnits: 0,
  unitsBacked: 0,
  imageURLs: [],
  contractURLs: [],
};

const NewMint = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>(initData);
  const [isDataValid, setIsDataValid] = useState(false);
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [verfImgURL, setVerfImgURL] = useState("");
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
      body: (
        <NewMintImages
          imgURLs={imgURLs}
          setImgURLs={setImgURLs}
          verfImgURL={verfImgURL}
          setVerfImgURL={setVerfImgURL}
        />
      ),
    },
    {
      label: "Contract",
      // TODO: Prepop w/ img urls, desc data, upload orig. Also, sign & upload _s1 version
      body: <NewMintContract prodData={productData} />,
    },
    {
      label: "Mint token",
      // TODO: mint nft
      body: <NewMintMint prodData={productData} />,
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
            <Box m="4em 1em 2em" textAlign="center">
              <Typography variant="h4">Congratulations!</Typography>
              <Typography variant="h5" mb="2em">
                You have successfully added your item to {appName}.
              </Typography>
              <Typography>Go to your Dashboard or the Product Listings page to view this item.</Typography>
            </Box>
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
