import { Box, Typography } from "@mui/material";
import CreateExpense from "../components/CreateExpense";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { db } from "../components/fire";
import Loader from "../components/Loader";
import TransactionCard from "../components/TransactionCard";
const Expense = () => {
	const [exp, setExp] = useState(null);
	useEffect(() => {
		const q = query(
			collection(db, "transaction"),
			where("for", "==", moment().format("MM-YYYY")),
			where("type", "==", "exp")
		);
		onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setExp(
				data.sort(
					(a, b) =>
						moment(b?.date, "DD-MM-YYYY") - moment(a?.date, "DD-MM-YYYY")
				)
			);
		});
	}, []);
	return (
		<Box>
			<CreateExpense />
			<Box sx={{ mt: 5 }}>
				<Typography variant="h4">Expense History</Typography>
				<Box sx={{ mt: 3 }}>
					{exp?.map((c, i) => (
						<TransactionCard key={i} data={c} />
					))}
					{!exp && <Loader />}
				</Box>
			</Box>
		</Box>
	);
};

export default Expense;
