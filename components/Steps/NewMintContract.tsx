import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductData } from "../../lib/utils/data-structs";

// temp
const src = "pdf/afile.pdf";
const walletAddr = "0x81745b7339d5067e82b93ca6bbad125f214525d3";
const sig =
  "0x5067e82b93ca6bbad125f214581745b7339d25d381745b7339d5067e82b93ca6bbad125f214525d381745b7339d5067e82b93ca6bbad125f214525d381745b7339d5067e82b93ca6bbad125f214525d381745b7339d5067e82b93ca6bbad125f214525d3";
// end temp

interface NewMintContractProps {
  prodData: ProductData;
}

const NewMintContract = ({ prodData }: NewMintContractProps) => {
  const [doc, setDoc] = useState<File>();
  const [docUrl, setDocUrl] = useState("");
  const [signedDoc, setSignedDoc] = useState<File>();
  const [signedDocUrl, setSignedDocUrl] = useState("");
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const generateDoc = async (prodData: ProductData, addr: string = "", sig: string = "") => {
    try {
      const resp = await fetch("/api/createdoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prodData, addr, sig }),
      });

      if (resp.status < 300) {
        const theBlob = await resp.blob();
        const theFile = new File([theBlob], `contract${addr && sig ? "_s1" : ""}.pdf`, { type: "application/pdf" });

        if (addr && sig) {
          setSignedDoc(theFile);
          setSignedDocUrl(URL.createObjectURL(theFile));
        } else {
          setDoc(theFile);
          setDocUrl(URL.createObjectURL(theFile));
        }
      } else {
        console.log(`Request error code: ${resp.status} (${resp.statusText}): ${(await resp.json()).message}`);
      }
    } catch (err) {
      console.log("Error making request: ", err);
    }
  };

  useEffect(() => {
    (async () => {
      await generateDoc(prodData);
    })();
  }, []);

  const signDoc = async () => {
    await generateDoc(prodData, walletAddr, sig);
  };

  const onUpload = async () => {
    if (!doc) {
      console.log("upload fn: no contract document");
      return;
    }
    if (!signedDoc) {
      console.log("upload fn: no signed document");
      return;
    }

    const formData = new FormData();
    formData.append("contr", doc, doc.name);
    formData.append("contr-s1", signedDoc, signedDoc.name);

    try {
      const resp = await fetch("/api/uploadcontract", {
        method: "POST",
        body: formData,
      });

      if (resp.status >= 400) {
        console.log(`Request error code: ${resp.status} (${resp.statusText}): ${(await resp.json()).message}`);
      } else {
        setIsUploadSuccess(true);
        console.log((await resp.json()).message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Typography variant="h6" mb="1em">
        Contracts and signing
      </Typography>
      <Typography>
        Now, take a look at the contract that will be in effect if this product is backed and both parties agree to
        convert to a Sale.
      </Typography>
      <Typography>NOTE: The option to accept/reject will be given before the sale process starts.</Typography>
      <p></p>
      <Typography>
        For this product to count towards collateral, the contract document has to be signed. The other party will only
        provide the second signature once the Sale phase has been agreed upon.
      </Typography>
      <Box my="1.5em" height="500px">
        <embed src={docUrl ? docUrl : src} type="application/pdf" width="100%" height="100%" />
      </Box>
      <Button sx={{ display: "block", m: "0 auto" }} variant="contained" disabled={!!signedDocUrl} onClick={signDoc}>
        Sign Document
      </Button>

      {signedDocUrl ? (
        <>
          <Box my="1.5em" height="500px">
            <embed src={signedDocUrl ? signedDocUrl : src} type="application/pdf" width="100%" height="100%" />
          </Box>
          <Button
            sx={{ display: "block", m: "0 auto" }}
            variant={isUploadSuccess ? "outlined" : "contained"}
            color="success"
            onClick={isUploadSuccess ? () => {} : onUpload}
          >
            {isUploadSuccess ? "Upload Success" : "Upload Documents"}
          </Button>
        </>
      ) : null}
    </>
  );
};

export default NewMintContract;
