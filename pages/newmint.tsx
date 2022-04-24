import { ChangeEvent, ReactNode, useState } from "react";
import { Box, Button, Card, FormControl, ImageList, ImageListItem, OutlinedInput } from "@mui/material";
import { InputAdornment, InputLabel } from "@mui/material";
import { Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";

// temp
const walletAddr = "";
const imgSideLen = 180;
const minNoImgs = 3;
const maxNoImgs = 5;
// end temp

const NewMint = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [fileName, setFileName] = useState("");
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [uploadResponse, setUploadResponse] = useState("");

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
          <TextField sx={{ mt: "1em" }} fullWidth label="Title" variant="outlined" required />
          <Box display="flex" gap="1em">
            <TextField
              sx={{ mt: "1em" }}
              fullWidth
              label="Brand"
              variant="outlined"
              placeholder="Eg: Samsung"
              required
            />
            <TextField
              sx={{ mt: "1em" }}
              fullWidth
              label="Model Name"
              variant="outlined"
              placeholder="Eg: Galaxy S20"
              required
            />
          </Box>
          <Box display="flex" gap="1em">
            <TextField
              sx={{ mt: "1em" }}
              fullWidth
              label="Model Number"
              variant="outlined"
              placeholder="Eg: GHX9750i-B"
              required
            />
            <TextField sx={{ mt: "1em" }} type="number" label="Model Year" variant="outlined" required />
            {/* <input type="number" min={1900} max={2022}></input> */}
            <TextField sx={{ mt: "1em" }} type="number" label="Serial Number" variant="outlined" />
          </Box>
          <TextField
            sx={{ mt: "1em" }}
            fullWidth
            disabled
            label="Your wallet address"
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
              />
            </FormControl>
          </Box>
          <Typography textAlign="right" color="text.secondary">
            Min. backing value: $ 2800
          </Typography>
          <TextField sx={{ mt: "1em" }} fullWidth label="Product description" multiline rows={4} required />
        </>
      ),
    },
    {
      label: "Upload images",
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
      body: (
        <>
          <Typography>Make sure your wallet is connected (click &quot;Connect&quot; in the top-right).</Typography>
          <Typography>The following steps will guide you through the process for minting a product.</Typography>
        </>
      ),
    },
    {
      label: "Final review",
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
                onClick={() => setActiveStep((step) => step + 1)}
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
