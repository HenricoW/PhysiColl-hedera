import { Box, Card, Chip, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { storeData } from "../lib/utils/temp_data";
import { shortAddress } from "../lib/utils/tools";

const cPadding = 15;
const cWidth = 300;

const Listings: NextPage = () => {
  return (
    <>
      <Typography variant="h5" align="center" my="1em">
        The latest products minted
      </Typography>

      <Box display="grid" gap=".5em" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))">
        {storeData.map((item) => (
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
    </>
  );
};

export default Listings;
