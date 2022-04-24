import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { useRouter } from "next/router";
import { appName } from "../../pages/_app";

// temp
const walletAddr = false;
// end temp

const MainNavBar = () => {
  const router = useRouter();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#444",
          MozBackdropFilter: "blur(20px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              pr=".3em"
              mr="auto"
              onClick={() => router.push("/")}
              sx={{ ":hover": { cursor: "pointer" } }}
            >
              <BlurOnIcon sx={{ fontSize: "2em", margin: "0 auto" }} />
              <Typography align="center" variant="h5" my=".5em" ml=".5em">
                {appName}
              </Typography>
            </Box>

            <Box ml="1em">
              {walletAddr ? null : (
                <Button variant="contained" onClick={() => {}}>
                  CONNECT
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar></Toolbar>
    </>
  );
};

export default MainNavBar;
