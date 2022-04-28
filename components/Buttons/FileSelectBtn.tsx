import { Button } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

interface FileSelectBtnProps {
  onFileAdd: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  mimeType: string;
  id: string;
  children: ReactNode;
}

const FileSelectBtn = ({ onFileAdd, disabled, mimeType, id, children }: FileSelectBtnProps) => {
  return (
    <form>
      <label htmlFor={id} style={{ textAlign: "center" }}>
        <input
          type="file"
          accept={mimeType}
          id={id}
          name="upload"
          onChange={(e) => onFileAdd(e)}
          disabled={disabled}
          style={{ display: "none" }}
        />
        <Button
          variant="outlined"
          component="span"
          sx={{ display: "block", width: "fit-content", margin: "1em auto" }}
          disabled={disabled}
        >
          {children}
        </Button>
      </label>
    </form>
  );
};

export default FileSelectBtn;
