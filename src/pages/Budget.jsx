import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import BudgetCard from "../components/BudgetCard";
import CreateBudget from "../components/CreateBudget";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../components/fire";
import moment from "moment";
import Loader from "../components/Loader";

const Budget = () => {
	const [bud, setBud] = useState(null);
	const [trans, setTrans] = useState(null);
	useEffect(() => {
		const q = query(collection(db, "budget"));
		onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setBud(
				data.sort(
					(a, b) => moment(b?.for, "MM-YYYY") - moment(a?.for, "MM-YYYY")
				)
			);
		});
	}, []);
	useEffect(() => {
		const q = query(collection(db, "transaction"));
		onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setTrans(data);
		});
	}, []);

	return (
		<Box>
			<CreateBudget />
			<Box sx={{ mt: 5 }}>
				<Typography variant="h4">Budget History</Typography>
				<Box sx={{ mt: 3 }}>
					{bud?.map((b, i) => (
						<Box key={i} sx={{ mt: 2 }}>
							<Typography variant="h6">
								{moment(b?.for, "MM-YYYY").format("MMMM, YYYY")}
							</Typography>
							<BudgetCard
								tran={trans?.filter((t) => t?.for === b?.for)}
								data={b}
							/>
						</Box>
					))}
					{!bud && <Loader />}
				</Box>
			</Box>
		</Box>
	);
};

export default Budget;
