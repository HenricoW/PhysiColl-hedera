import { Box, Button, Typography } from "@mui/material";
import React from "react";

// temp
const src = "pdf/afile.pdf";
// end temp

const NewMintContract = () => {
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
        <embed src={src} type="application/pdf" width="100%" height="100%" />
      </Box>
      <Button sx={{ display: "block", m: "0 auto" }} variant="contained">
        Sign &amp; Upload
      </Button>
    </>
  );
};

export default NewMintContract;
