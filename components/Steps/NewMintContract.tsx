import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductData } from "../../lib/utils/data-structs";

// temp
const src = "pdf/afile.pdf";
// end temp

interface NewMintContractProps {
  prodData: ProductData;
}

const NewMintContract = ({ prodData }: NewMintContractProps) => {
  const [doc, setDoc] = useState<File>();
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/createdoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prodData),
      });

      const theBlob = await resp.blob();
      const theFile = new File([theBlob], "contract.pdf", { type: "application/pdf" });
      setDoc(theFile);
      const url = URL.createObjectURL(theFile);
      setFileUrl(url);

      console.log("file response: ", theBlob);
    })();
  }, []);

  return (
    <>
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
        <embed src={fileUrl ? fileUrl : src} type="application/pdf" width="100%" height="100%" />
      </Box>
      <Button sx={{ display: "block", m: "0 auto" }} variant="contained">
        Sign &amp; Upload
      </Button>
    </>
  );
};

export default NewMintContract;
