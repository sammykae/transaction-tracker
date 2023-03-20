import { Box, Typography } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CreateIncome from "../components/CreateIncome";
import { db } from "../components/fire";
import Loader from "../components/Loader";
import TransactionCard from "../components/TransactionCard";

const Income = () => {
	const [inc, setInc] = useState(null);
	useEffect(() => {
		const q = query(
			collection(db, "transaction"),
			where("for", "==", moment().format("MM-YYYY")),
			where("type", "==", "inc")
		);
		onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setInc(
				data.sort(
					(a, b) =>
						moment(b?.date, "DD-MM-YYYY") - moment(a?.date, "DD-MM-YYYY")
				)
			);
		});
	}, []);
	return (
		<Box>
			<CreateIncome />
			<Box sx={{ mt: 5 }}>
				<Typography variant="h4">Income History</Typography>
				<Box sx={{ mt: 3 }}>
					{inc?.map((c, i) => (
						<TransactionCard key={i} data={c} />
					))}
					{!inc && <Loader />}
				</Box>
			</Box>
		</Box>
	);
};

export default Income;
