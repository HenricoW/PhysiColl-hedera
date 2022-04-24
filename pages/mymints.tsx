import { Box, Card, CardContent, Divider, Theme, Typography } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import DashSideBar from "../components/Layout/DashSideBar";

// temp
export const mintlist = [
  {
    id: 1,
    image: "/img/19.jpg",
    title: "Samsung Galaxy S10",
    description: "Excellent condition. One minor scratch on back panel. Includes Galaxy buds.",
    openToSell: true,
    reqAmount: 400,
    backedAmount: 380,
    rate: 9,
    creator: "",
    owner: "",
    backer: "",
  },
  {
    id: 2,
    image: "",
    title: "LG 55 inch LED TV",
    description: "Great condition, works flawlessly.",
    openToSell: false,
    reqAmount: 550,
    backedAmount: 0,
    rate: 9,
    creator: "",
    owner: "",
    backer: "",
  },
  {
    id: 3,
    image: "",
    title: "Gutsy Gibbon NFT #1337",
    description: "One of 10000 Gutsy Gibbon NFTs minted. Rarity score of .23 (good)",
    openToSell: false,
    reqAmount: 1300,
    backedAmount: 1300,
    rate: 8,
    creator: "",
    owner: "",
    backer: "",
  },
  {
    id: 1,
    image: "/img/19.jpg",
    title: "Samsung Galaxy S10",
    description: "Excellent condition. One minor scratch on back panel. Includes Galaxy buds.",
    openToSell: true,
    reqAmount: 400,
    backedAmount: 380,
    rate: 9,
    creator: "",
    owner: "",
    backer: "",
  },
  {
    id: 2,
    image: "",
    title: "LG 55 inch LED TV",
    description: "Great condition, works flawlessly.",
    openToSell: false,
    reqAmount: 550,
    backedAmount: 0,
    rate: 9,
    creator: "",
    owner: "",
    backer: "",
  },
  {
    id: 3,
    image: "",
    title: "Gutsy Gibbon NFT #1337",
    description: "One of 10000 Gutsy Gibbon NFTs minted. Rarity score of .23 (good)",
    openToSell: false,
    reqAmount: 1300,
    backedAmount: 1300,
    rate: 8,
    creator: "",
    owner: "",
    backer: "",
  },
];
// end temp

const MyMints: NextPage = () => {
  return (
    <>
      <Box fontWeight="fontWeightLight" fontSize="h4.fontSize" className="title">
        My Mints
      </Box>
      <Box mt="2em" display="grid" gap="1em" gridTemplateColumns="1fr 220px">
        <Box>
          {mintlist.map((item) => (
            <Card
              key={item.id}
              //   variant="outlined"
              sx={{
                p: ".5em 1em",
                mb: "1em",
                backgroundColor: "#ccc",
                width: "100%",
                height: "220px",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: (theme: Theme) => "0 0 1em " + theme.palette.info.main,
                  backgroundColor: "#ddd",
                },
              }}
            >
              {/* <Box display="flex" alignItems="center"> */}
              <img src="/img/19.jpg" width="300px" />
              <CardContent sx={{ width: "100%", ":last-child": { pb: "16px" } }}>
                <Typography variant="h5" mb=".5em">
                  {item.title}
                </Typography>
                <Typography>{item.description}</Typography>
                <Typography></Typography>
                <Divider sx={{ my: "1em" }} />
                <Typography align="right">
                  ${item.backedAmount} / {item.reqAmount} backed
                </Typography>
              </CardContent>
              {/* </Box> */}
            </Card>
          ))}
        </Box>
        <DashSideBar />
      </Box>
    </>
  );
};

export default MyMints;
