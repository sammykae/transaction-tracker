import {
	Box,
	ListItem,
	ListItemIcon,
	ListItemText,
	Drawer,
	List,
} from "@mui/material";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiReceiveMoney, GiPayMoney, GiMoneyStack } from "react-icons/gi";
import LogoutIcon from "@mui/icons-material/Logout";
import { FaMoneyCheck } from "react-icons/fa";
import { Colors } from "../components/Colors";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { signOut } from "firebase/auth";
import { auth } from "../components/fire";
import { toast } from "react-toastify";
const activeStyle = {
	backgroundColor: Colors.highlight,
	color: Colors.primary,
	"&:hover": {
		cursor: "pointer",
	},
};

const Sidebar = ({
	setMobileOpen,
	handleDrawerToggle,
	mobileOpen,
	drawerWidth,
	window,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const handleLogout = () => {
		signOut(auth).then(() => {
			navigate("/");
			toast.success("Signed out successful");
		});
	};
	const meniItems = [
		{
			text: "Overview",
			icon: (
				<GridViewRoundedIcon sx={{ fontSize: 35, color: Colors.primary }} />
			),
			path: "/dashboard",
		},
		{
			text: "Transaction History",
			icon: <FaMoneyCheck size={35} color={Colors.primary} />,
			path: "/dashboard/history",
		},
		{
			text: "Set Budget",
			icon: <GiMoneyStack size={35} color={Colors.primary} />,
			path: "/dashboard/budget",
		},
		{
			text: "Record Income",
			icon: <GiReceiveMoney size={35} color={Colors.primary} />,
			path: "/dashboard/income",
		},
		{
			text: "Record Expense",
			icon: <GiPayMoney size={35} color={Colors.primary} />,
			path: "/dashboard/expense",
		},
		{
			text: "Logout",
			icon: <LogoutIcon sx={{ fontSize: 35, color: Colors.primary }} />,
		},
	];

	const drawer = (
		<div>
			{/* <Divider /> */}
			<List
				sx={{
					display: "flex",
					flexDirection: "column",
					height: { xs: "97vh", md: "calc(100vh - 68px)" },
				}}
			>
				{meniItems.map((item) =>
					item?.text === "Logout" ? (
						<ListItem
							key={item.text}
							sx={{
								m: "5% 0",
								p: "8% 10%",
								cursor: "pointer",
								"&:hover": {
									backgroundColor: Colors.highlight,
								},
								marginTop: "auto",
							}}
							onClick={handleLogout}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText
								sx={{ textTransform: "uppercase" }}
								primary={item.text}
							/>
						</ListItem>
					) : (
						<ListItem
							key={item.text}
							sx={
								location.pathname === item.path ||
								location.pathname === item.path + "/"
									? { ...activeStyle, m: "5% 0", p: "8%" }
									: { m: "5% 0", p: "8%", cursor: "pointer" }
							}
							onClick={() => {
								navigate(item.path);
								setMobileOpen(false);
							}}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText
								sx={{ textTransform: "uppercase" }}
								primary={item.text}
							/>
						</ListItem>
					)
				)}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<div className="sidebar">
			<Box
				component="nav"
				sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", md: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", md: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							marginTop: { md: "68px" },
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</div>
	);
};

export default Sidebar;
