import {
	Box,
	Button,
	ButtonBase,
	FormControl,
	Typography,
} from "@mui/material";
import logo from "../assets/images/jethro.png";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Loader from "../components/Loader";
import { CustomInput } from "../components/CustomInput";
import { Colors } from "../components/Colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../components/fire";
const Signin = ({ loggedin, setLoggedin }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setLoggedin(true);
				setLoading(false);
			})
			.catch((error) => {
				toast.error(error.code);
				setLoading(false);
			});
	};
	useEffect(() => {
		loggedin && navigate("/dashboard");
	}, [loggedin, navigate]);
	return (
		<>
			{loading && <Loader />}
			{!loading && (
				<Box
					sx={{
						p: "3% 5%",
						width: { xs: "80%", sm: "70%", md: "40%" },
						margin: "15vh auto",
						borderRadius: "10px",
						boxShadow: "0px 0px 10px #000000",
					}}
				>
					<Box textAlign={"center"}>
						<img src={logo} alt="logo" height={150} width={150} />
						<Typography variant="h4">User Login</Typography>
					</Box>
					<form onSubmit={handleSubmit}>
						<FormControl
							fullWidth
							sx={{ m: "3% 0", fontSize: "10rem" }}
							variant="standard"
						>
							<CustomInput
								name="email"
								required
								type="email"
								id="email"
								label="Email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								sx={{ width: { xs: "92%", sm: "95%", md: "93%", lg: "95%" } }}
							/>
						</FormControl>
						<Box sx={{ display: "flex" }}>
							<FormControl
								fullWidth
								sx={{
									m: "3% 0",
									display: "flex",
									flexDirection: "row",
									columnGap: 1,
								}}
								variant="standard"
							>
								<CustomInput
									name="password"
									required
									id="password"
									label="Password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									type={!show ? "password" : "text"}
									sx={{ width: "100%" }}
								/>

								<ButtonBase onClick={() => setShow(!show)}>
									{!show ? (
										<VisibilityOutlinedIcon sx={{ alignSelf: "center" }} />
									) : (
										<VisibilityOffOutlinedIcon sx={{ alignSelf: "center" }} />
									)}
								</ButtonBase>
							</FormControl>
						</Box>
						<Box sx={{ m: "3% 0" }}>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								sx={{
									backgroundColor: Colors.primary,
									"&:hover": {
										backgroundColor: Colors.hover,
									},
								}}
							>
								log in
							</Button>
						</Box>

						<Box
							sx={{
								m: "3% 0",
								display: { xs: "block", md: "flex" },
								justifyContent: "space-between",
							}}
						>
							<Typography>
								<Link
									style={{ textDecoration: "none", color: Colors.primary }}
									to={"/reset"}
									title="Forgotten Password?"
								>
									Forgotten Password?
								</Link>
							</Typography>
						</Box>
					</form>
				</Box>
			)}
		</>
	);
};

export default Signin;
