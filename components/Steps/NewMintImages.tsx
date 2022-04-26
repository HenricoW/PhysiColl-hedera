import { Box, Button, ImageList, ImageListItem, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { minNoImgs } from "../../pages/newmint";

// temp
const imgSideLen = 180;
const maxNoImgs = 5;
const uploadResponse = "";
// end temp

interface NewMintImagesProps {
  imgURLs: string[];
  setImgURLs: Dispatch<SetStateAction<string[]>>;
}

const NewMintImages = ({ imgURLs, setImgURLs }: NewMintImagesProps) => {
  const [fileName, setFileName] = useState("");
  const [imgFiles, setImgFiles] = useState<File[]>([]);

  const uploadDisable = imgURLs.length === maxNoImgs;

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

  return (
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
  );
};

export default NewMintImages;
