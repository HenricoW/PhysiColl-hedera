import { TextField } from "@mui/material";

const FormField = (
  label: string,
  value: string | number,
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  fullW?: boolean,
  placeholder?: string
) => (
  <TextField
    label={label}
    sx={{ mt: "1em" }}
    fullWidth={fullW}
    variant="outlined"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
  />
);

export default FormField;
