import { Box, Button, ImageList, ImageListItem, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { uploadImages } from "../../lib/utils/image-utils";
import { minNoImgs } from "../../pages/newmint";
import FileSelectBtn from "../Buttons/FileSelectBtn";

// TODO:
// - "next" btn conditional on upload response

// temp
const imgSideLen = 180;
const maxNoImgs = 5;
const uploadResponse = "";
// end temp

interface NewMintImagesProps {
  imgURLs: string[];
  setImgURLs: Dispatch<SetStateAction<string[]>>;
  verfImgURL: string;
  setVerfImgURL: (url: string) => void;
}

const NewMintImages = ({ imgURLs, setImgURLs, verfImgURL, setVerfImgURL }: NewMintImagesProps) => {
  const [fileName, setFileName] = useState("");
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [verifImg, setVerifImg] = useState<File>();

  const selectDisable = imgURLs.length === maxNoImgs;

  const onImgAdd = (imgType: "product" | "verify") => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const theFile = e.target.files[0];
      setFileName(theFile.name ?? "");

      const blob = new Blob([theFile]);
      switch (imgType) {
        case "product":
          setImgFiles((imgs) => [theFile, ...imgs]);
          setImgURLs((urls) => [URL.createObjectURL(blob), ...urls]);
          break;
        case "verify":
          setVerifImg(theFile);
          setVerfImgURL(URL.createObjectURL(blob));
          break;
        default:
          break;
      }
    }
  };

  const notEnoughImgs = imgURLs.length < minNoImgs;

  return (
    <>
      <Typography mt="1em">
        Select between {minNoImgs} and {maxNoImgs} image files
      </Typography>

      {fileName ? (
        <Typography align="center" m="1em 0 .5em">
          {fileName}
        </Typography>
      ) : null}

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

      <FileSelectBtn onFileAdd={onImgAdd("product")} disabled={selectDisable} mimeType="image/*" id="upload-btn">
        Choose Image
      </FileSelectBtn>

      <Button
        variant="outlined"
        color="error"
        sx={{ display: "block", m: "0 auto" }}
        onClick={() => {
          setImgFiles([]);
          setImgURLs([]);
        }}
      >
        Reset
      </Button>

      <Typography mt="2em">Add a verification image according to the following illustration:</Typography>

      {verfImgURL ? (
        <Box textAlign="center" mt="1em">
          <img src={verfImgURL} width={imgSideLen} height={imgSideLen} style={{ overflow: "hidden" }} />
        </Box>
      ) : null}

      <FileSelectBtn onFileAdd={onImgAdd("verify")} disabled={notEnoughImgs} mimeType="image/*" id="verif-btn">
        Add Verification Image
      </FileSelectBtn>

      <Button
        variant="contained"
        color="success"
        sx={{ display: "block", m: "2em auto 0" }}
        disabled={notEnoughImgs || !verfImgURL}
        onClick={() => uploadImages(imgFiles, verifImg)}
      >
        Upload All Images
      </Button>
    </>
  );
};

export default NewMintImages;
