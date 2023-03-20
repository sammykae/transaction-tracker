import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const BudgetCard = ({ tran, data }) => {
	return (
		<Paper
			sx={{
				p: 2,

				display: { xs: "block", sm: "flex" },
				justifyContent: "space-between",
				alignItems: "center",
				columnGap: 2,
				width: { md: "95%", lg: "85%" },
			}}
		>
			<Box>
				<Typography fontSize={18} marginBottom={1}>
					Month Budget:&nbsp;
					{data?.amount?.toLocaleString("en-NG", {
						style: "currency",
						currency: "NGN",
					})}
				</Typography>
				<Typography fontSize={18} marginBottom={1}>
					Month Cost:&nbsp;
					{(
						data?.amount -
						tran
							?.filter((t) => t.type === "exp")
							?.reduce(
								(accumulator, currentValue) =>
									accumulator + currentValue.amount,
								0
							)
					)?.toLocaleString("en-NG", {
						style: "currency",
						currency: "NGN",
					})}
				</Typography>
			</Box>
			<Box
				sx={{
					mt: { xs: 2, sm: 0 },
				}}
			>
				<Typography fontSize={18} marginBottom={1} color={"green"}>
					Month Income:&nbsp;
					{tran
						?.filter((t) => t.type === "inc")
						?.reduce(
							(accumulator, currentValue) => accumulator + currentValue.amount,
							0
						)
						?.toLocaleString("en-NG", {
							style: "currency",
							currency: "NGN",
						})}
				</Typography>
				<Typography fontSize={18} marginBottom={1} color={"red"}>
					Month Expense:&nbsp;
					{tran
						?.filter((t) => t.type === "exp")
						?.reduce(
							(accumulator, currentValue) => accumulator + currentValue.amount,
							0
						)
						?.toLocaleString("en-NG", {
							style: "currency",
							currency: "NGN",
						})}
				</Typography>
			</Box>
		</Paper>
	);
};

export default BudgetCard;
