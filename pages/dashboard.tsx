import { Box, Card, Chip, CircularProgress, CircularProgressProps, Divider, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { storeData } from "../lib/utils/temp_data";
import { shortAddress } from "../lib/utils/tools";
import { appName } from "./_app";

// temp
const lastMints = storeData.slice(0, 3);
const cPadding = 15;
const cWidth = 260;
const walletAddr = "0x81745b7339d5067e82b93ca6bbad125f214525d3";
// end temp

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", mt: "1em" }}>
      <CircularProgress variant="determinate" size="6em" thickness={6} sx={{ color: "green" }} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize="1.5em" component="div" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`${appName} | Dashboard`}</title>
        <meta name="description" content={`${appName} | Dashboard`} />
      </Head>

      <Box sx={{ color: "#2b2b2b" }}>
        <Box display="flex" alignItems="center" justifyContent="space-around" flexWrap="wrap" gap="1.5em">
          <Box mt="1em">
            <Typography variant="h4" mb=".3em">
              Good day, {shortAddress(walletAddr)}
            </Typography>
            <Typography>KYC Status: verified</Typography>
            <Typography>KYC Provider: Trulioo</Typography>
          </Box>

          <Box>
            <Card
              sx={{
                p: "2em 5em",
                my: "1em",
                backgroundColor: "#555",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-around",
                justifySelf: "center",
                gap: "4em",
                color: "#cbcbcb",
                width: "fit-content",
              }}
            >
              <div>
                <Typography variant="h6">Assets Minted</Typography>
                <Typography m=".2em 0 .4em" variant="h4">
                  5 Products
                </Typography>
                <Typography variant="body2" color="#aaa">
                  Tot. value: $ 12 000.00
                </Typography>
                <Typography variant="body2" color="#aaa">
                  37% backed
                </Typography>
              </div>
              <Divider orientation="vertical" sx={{ backgroundColor: "#888" }} flexItem />
              <div>
                <Typography variant="h6">Collateral Usage</Typography>
                <Typography m=".2em 0 .4em" variant="h4">
                  78% Utilization
                </Typography>
                <Typography variant="body2" color="#aaa">
                  Funds available: $ 4 600.00
                </Typography>
                <Typography variant="body2" color="#aaa">
                  Funds withdrawn: $ 3 700.00
                </Typography>
              </div>
              <Divider orientation="vertical" sx={{ backgroundColor: "#888" }} flexItem />
              <div>
                <Typography variant="h6">Interest Fund</Typography>
                <Typography m=".2em 0 .4em" variant="h4">
                  37 Days
                </Typography>
                <Typography variant="body2" color="#aaa">
                  of Interest runway time at
                </Typography>
                <Typography variant="body2" color="#aaa">
                  9.35% average APR
                </Typography>
              </div>
            </Card>
          </Box>
        </Box>

        <Box display="flex" gap="3em" flexWrap="wrap" mt="2em">
          <Box>
            <Card
              sx={{
                backgroundColor: "unset",
                boxShadow: "unset",
                borderRadius: "20px",
                // border: "2px solid #777",
                color: "#484848",
              }}
            >
              <Typography fontSize="1.7em">Latest Mints</Typography>

              <Box display="flex" gap="2em" flexWrap="wrap">
                {lastMints.map((item) => (
                  <Card
                    key={item.title}
                    sx={{
                      p: `${cPadding}px`,
                      m: "1em auto",
                      backgroundColor: "#ccc",
                      width: `${cWidth}px`,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#ddd",
                      },
                    }}
                  >
                    <div>
                      <Image
                        src="/img/12.jpg"
                        width={`${cWidth - 2 * cPadding}px`}
                        height="200px"
                        style={{ margin: "0 0 2em" }}
                      />
                      <Typography my=".5em">{item.title}</Typography>
                    </div>

                    <div>
                      <Typography variant="body2">Creator: {shortAddress(item.creator)}</Typography>
                      <Box display="flex" justifyContent="space-between" mt=".5em">
                        {item.backer === "" ? (
                          <Chip label="not backed" color="primary" variant="filled" />
                        ) : (
                          <Chip label="backed" color="success" variant="outlined" />
                        )}
                        <Typography variant="h6" align="right">
                          $ {item.requestValue}
                        </Typography>
                      </Box>
                    </div>
                  </Card>
                ))}
              </Box>
            </Card>
          </Box>

          <Box minWidth="300px" color="#484848">
            <Typography fontSize="1.7em" mb=".5em">
              Interest Fund
            </Typography>

            <Typography>Pool size vs current 3 month value:</Typography>
            <Box display="flex" gap="1em" alignItems="center" justifyContent="space-around">
              <CircularProgressWithLabel value={78} />
              <div>
                <Typography>Available: $ 360.77</Typography>
                <Typography>3 month value: $ 433.23</Typography>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
