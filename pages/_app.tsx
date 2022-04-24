import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import MainNavBar from "../components/Layout/MainNavbar";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";

export const appName = "PhysiColl";

const darkTheme = createTheme({
  // palette: {
  //   mode: "dark",
  //   text: {
  //     primary: "#fff",
  //     secondary: grey[500],
  //   },
  // },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{appName}</title>
        <meta name="description" content={`${appName} - mint physical items`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={darkTheme}>
        <MainNavBar />
        <Box mx="4em" p="1em">
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
