import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
const drawerWidth = "250px";

export const Layout = ({ loggedin, setLoggedin }) => {
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	useEffect(() => {
		!loggedin && navigate("/");
	}, [loggedin, navigate]);
	return (
		<div className="layout">
			<Sidebar
				setMobileOpen={setMobileOpen}
				mobileOpen={mobileOpen}
				handleDrawerToggle={handleDrawerToggle}
				drawerWidth={drawerWidth}
			/>
			<Header
				handleDrawerToggle={handleDrawerToggle}
				drawerWidth={drawerWidth}
			/>
			<Box
				sx={{
					mt: "12vh",

					marginLeft: { md: `calc(100% - ${drawerWidth} + 10%)` },
					ml: { xs: "2%", md: `calc(${drawerWidth} + 2%)` },
					mr: "2%",
				}}
				className="right-content"
			>
				<Outlet />
			</Box>
		</div>
	);
};

export default Layout;
