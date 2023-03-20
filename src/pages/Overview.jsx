import { Box, Paper, Typography } from "@mui/material";
import {
	collection,
	limit,
	onSnapshot,
	query,
	where,
	doc,
	getDoc,
} from "firebase/firestore";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Colors } from "../components/Colors";
import { db } from "../components/fire";
import Loader from "../components/Loader";
import TransactionCard from "../components/TransactionCard";

const Overview = () => {
	const [trans, setTrans] = useState(null);
	const [budget, setBudget] = useState(null);
	const [forTrans, setForTrans] = useState(null);
	useEffect(() => {
		const q = query(collection(db, "transaction"), limit(4));
		onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setTrans(data);
		});
	}, []);
	useEffect(() => {
		const q = query(
			collection(db, "transaction"),
			where("for", "==", moment().format("MM-YYYY"))
		);
		onSnapshot(q, (querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setForTrans(
				data.sort(
					(a, b) =>
						moment(b?.date, "DD-MM-YYYY") - moment(a?.date, "DD-MM-YYYY")
				)
			);
		});
	}, []);
	useEffect(() => {
		const getBudget = async () => {
			const docRef = doc(db, "budget", moment().format("MM-YYYY"));
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setBudget(docSnap.data());
			} else {
				toast.warning("You have not set a Budget for this month");
			}
		};
		getBudget();
	}, []);

	return (
		<Box>
			<Box
				sx={{
					display: "grid",
					columnGap: { xs: 5, lg: 10 },
					rowGap: 3,
					gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
				}}
			>
				<Paper
					sx={{
						bgcolor: Colors.highlight,
						p: 1,
						maxWidth: { xs: "100%", lg: "70%" },
						height: 80,
					}}
				>
					<Typography fontWeight={500} variant="h5" textAlign={"center"}>
						{moment().format("MMMM")} Budget
					</Typography>
					<Typography variant="h5" textAlign={"center"}>
						{budget?.amount?.toLocaleString("en-NG", {
							style: "currency",
							currency: "NGN",
						}) || "Loading"}
					</Typography>
				</Paper>
				<Paper
					sx={{
						bgcolor: Colors.highlight,
						p: 1,
						maxWidth: { xs: "100%", lg: "70%" },
						height: 80,
					}}
				>
					<Typography fontWeight={500} variant="h5" textAlign={"center"}>
						Budget Balance
					</Typography>
					<Typography variant="h5" textAlign={"center"}>
						{forTrans && budget
							? (
									budget?.amount -
									forTrans
										?.filter((r) => r?.type === "exp")
										?.reduce(
											(accumulator, currentValue) =>
												accumulator + currentValue.amount,
											0
										)
							  )?.toLocaleString("en-NG", {
									style: "currency",
									currency: "NGN",
							  })
							: "Loading"}
					</Typography>
				</Paper>
				<Paper
					sx={{
						bgcolor: Colors.highlight,
						p: 1,
						maxWidth: { xs: "100%", lg: "70%" },
						height: 80,
					}}
				>
					<Typography fontWeight={500} variant="h5" textAlign={"center"}>
						Total Income
					</Typography>
					<Typography variant="h5" textAlign={"center"}>
						{forTrans
							?.filter((r) => r?.type === "inc")
							?.reduce(
								(accumulator, currentValue) =>
									accumulator + currentValue.amount,
								0
							)
							?.toLocaleString("en-NG", {
								style: "currency",
								currency: "NGN",
							}) || "Loading"}
					</Typography>
				</Paper>
				<Paper
					sx={{
						bgcolor: Colors.highlight,
						p: 1,
						maxWidth: { xs: "100%", lg: "70%" },
						height: 80,
					}}
				>
					<Typography fontWeight={500} variant="h5" textAlign={"center"}>
						Total Expense
					</Typography>
					<Typography variant="h5" textAlign={"center"}>
						{forTrans
							?.filter((r) => r?.type === "exp")
							?.reduce(
								(accumulator, currentValue) =>
									accumulator + currentValue.amount,
								0
							)
							?.toLocaleString("en-NG", {
								style: "currency",
								currency: "NGN",
							}) || "Loading"}
					</Typography>
				</Paper>
			</Box>
			<Box sx={{ mt: 5 }}>
				<Typography variant="h4">Transaction History</Typography>

				<Box sx={{ mt: 3 }}>
					{trans?.slice(0, 4)?.map((t, i) => (
						<TransactionCard key={i} data={t} />
					))}
					{!trans && <Loader />}
				</Box>
			</Box>
		</Box>
	);
};

export default Overview;
