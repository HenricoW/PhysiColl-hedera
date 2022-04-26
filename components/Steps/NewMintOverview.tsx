import { Typography } from "@mui/material";

const NewMintOverview = () => {
  return (
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
          <Typography>Preview the contract (if it goes to sale) that will be used in the event of a sale</Typography>
        </li>
        <li>
          <Typography>Final review and payment</Typography>
        </li>
      </ol>
    </>
  );
};

export default NewMintOverview;
