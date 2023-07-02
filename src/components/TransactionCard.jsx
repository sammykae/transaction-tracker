import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const TransactionCard = ({ data }) => {
  return (
    <Paper
      sx={{
        mt: 2,
        p: 2,
        borderLeft: `8px solid ${data?.type === "inc" ? "green" : "red"}`,
        borderRight: `8px solid ${data?.type === "inc" ? "green" : "red"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 2,
        width: { md: "95%", lg: "85%" },
      }}
    >
      <Box>
        <Typography fontSize={20} marginBottom={1}>
          {data?.desc}
        </Typography>
        <Typography fontWeight={500}>{data?.date}</Typography>
      </Box>
      <Typography
        fontWeight={500}
        color={`${data?.type === "inc" ? "green" : "red"}`}
      >
        <span>{data?.type === "inc" ? "+" : "-"}</span>
        {data?.amount?.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        })}
      </Typography>
    </Paper>
  );
};

export default TransactionCard;
