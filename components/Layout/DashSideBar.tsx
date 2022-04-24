import { Box, Card, CardContent, Divider, MenuItem, MenuList, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { appName } from "../../pages/_app";

const DashSideBar = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        px: ".5em",
        mb: "1em",
        width: "100%",
        backgroundColor: "#bbb",
      }}
    >
      <CardContent sx={{ ":last-child": { pb: "16px" } }}>
        <Typography align="center" variant="h5" my=".5em" ml=".5em">
          {appName}
        </Typography>
        <Typography></Typography>
        <Divider sx={{ my: "1em" }} />
        <MenuList>
          <MenuItem onClick={() => {}}>
            <Box m="0 auto" display="flex" flexDirection="column" alignItems="center">
              <DashboardIcon sx={{ fontSize: "2.5em", margin: "0 auto" }} />
              <Typography align="center" variant="h6" my=".5em">
                Dashboard
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <Box m="0 auto" display="flex" flexDirection="column" alignItems="center">
              <LogoutIcon sx={{ fontSize: "2.5em", margin: "0 auto" }} />
              <Typography align="center" variant="h6" my=".5em">
                My Mints
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <Box m="0 auto" display="flex" flexDirection="column" alignItems="center">
              <DashboardIcon sx={{ fontSize: "2.5em", margin: "0 auto" }} />
              <Typography align="center" variant="h6" my=".5em">
                Backing
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <Box m="0 auto" display="flex" flexDirection="column" alignItems="center">
              <DashboardIcon sx={{ fontSize: "2.5em", margin: "0 auto" }} />
              <Typography align="center" variant="h6" my=".5em">
                Invest
              </Typography>
            </Box>
          </MenuItem>
        </MenuList>
      </CardContent>
    </Card>
  );
};

export default DashSideBar;
