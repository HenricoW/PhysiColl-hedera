import { Link, Paper, styled, Table, TableBody, TableCell, TableContainer } from "@mui/material";
import { tableCellClasses, TableHead, TableRow } from "@mui/material";

const gatewayPrefix = "https://ipfs.infura.io/";

interface TwoFieldTableProps {
  titles: string[];
  tableData: {
    name: string;
    url: string;
  }[];
  LColLeftMargin?: string;
  RColWidth?: string;
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#bfbfbf",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#ccc",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TwoFieldTable = ({ titles, tableData, LColLeftMargin = "4em", RColWidth = "70%" }: TwoFieldTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ m: "1em 0" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ ml: LColLeftMargin }}>{titles[0]}</StyledTableCell>
            <StyledTableCell align="left" width={RColWidth}>
              {titles[1]}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((tData) => (
            <StyledTableRow key={tData.name}>
              <StyledTableCell align="left" sx={{ ml: LColLeftMargin }}>
                {tData.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                <Link href={gatewayPrefix + tData.url} target="_blank">
                  {tData.url}
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TwoFieldTable;
