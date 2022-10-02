import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Tabs, Tab, Button, Menu, MenuItem } from "@material-ui/core";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: "3em",
		[theme.breakpoints.down("md")]: {
			marginBottom: "2em",
		},
		[theme.breakpoints.down("xs")]: {
			marginBottom: "1.25em",
		},
	},

	logoContainer: {
		padding: 0,
		"&:hover": {
			backgroundColor: "transparent",
		},
	},

	logo: {
		height: "8em",
		[theme.breakpoints.down("md")]: {
			height: "7em",
		},
		[theme.breakpoints.down("xs")]: {
			height: "5.5em",
		},
	},

	tabContainer: {
		marginLeft: "auto",
	},

	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: "25px",
	},

	button: {
		...theme.typography.estimate,
		borderRadius: "50px",
		marginLeft: "50px",
		marginRight: "25px",
		height: "45px",
	},

	menu: {
		backgroundColor: theme.palette.common.blue,
		color: "white",
		borderRadius: 0,
	},

	menuItem: {
		...theme.typography.tab,
		opacity: 0.7,
		"&:hover": {
			opacity: 1,
		},
	},

	drawerIconContainer: {
		marginLeft: "auto",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},

	drawerIcon: {
		height: "50px",
		width: "50px",
	},
}));

export default function ElevateAppBar(props) {
	const classes = useStyles();
	const [value, setvalue] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setopen] = useState(false);
	const [selectedIndex, setselectedIndex] = useState(0);
	const [openDrawer, setopenDrawer] = useState(false);

	const IOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	const handleChange = (e, value) => {
		setvalue(value);
	};

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
		setopen(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setopen(false);
	};

	const logoClickHandler = () => {
		handleChange(null, 0);
	};

	const menuOptions = [
		{ name: "Services", link: "/services" },
		{ name: "Custom Software Development", link: "/customsoftware" },
		{ name: "Mobile App Development", link: "/mobileapps" },
		{ name: "Website Development", link: "/websites" },
	];

	const handleMenuClick = (e, i) => {
		setAnchorEl(null);
		setopen(false);
		setselectedIndex(i);
	};

	useEffect(() => {
		let current_path = window.location.pathname;

		switch (current_path) {
			case "/":
				if (value !== 0) {
					setvalue(0);
				}
				break;
			case "/services":
				if (value !== 0) {
					setvalue(1);
					setselectedIndex(0);
				}
				break;
			case "/customsoftware":
				if (value !== 1) {
					setvalue(1);
					setselectedIndex(1);
				}
				break;
			case "/mobileapps":
				if (value !== 1) {
					setvalue(1);
					setselectedIndex(2);
				}
				break;
			case "/websites":
				if (value !== 1) {
					setvalue(1);
					setselectedIndex(3);
				}
				break;

			case "/revolution":
				if (value !== 2) {
					setvalue(2);
				}
				break;

			case "/about":
				if (value !== 3) {
					setvalue(3);
				}
				break;

			case "/contact":
				if (value !== 4) {
					setvalue(4);
				}
				break;

			case "/estimate":
				if (value !== 5) {
					setvalue(5);
				}
				break;

			default:
				break;
		}
	}, [value]);

	const tabs = (
		<React.Fragment>
			<Tabs
				value={value}
				onChange={handleChange}
				className={classes.tabContainer}
				indicatorColor="primary"
			>
				<Tab className={classes.tab} component={Link} to="/" label="Home" />
				<Tab
					aria-owns={anchorEl ? "simple-menu" : undefined}
					aria-haspopup={anchorEl ? "true" : undefined}
					className={classes.tab}
					component={Link}
					to="/services"
					label="Services"
					onMouseOver={handleClick}
				/>
				<Tab
					className={classes.tab}
					component={Link}
					to="/revolution"
					label="The Revolution"
				/>

				<Tab
					className={classes.tab}
					component={Link}
					to="/about"
					label="About Us"
				/>
				<Tab
					className={classes.tab}
					component={Link}
					to="/contact"
					label="Contact Us"
				/>
			</Tabs>
			<Button
				variant="contained"
				color="secondary"
				component={Link}
				to="estimate"
				className={classes.button}
			>
				Free Estimate
			</Button>

			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{ onMouseLeave: handleClose }}
				elevation={0}
				classes={{ paper: classes.menu }}
			>
				{menuOptions.map((option, i) => (
					<MenuItem
						key={option}
						component={Link}
						to={option.link}
						classes={{ root: classes.menuItem }}
						onClick={(e) => {
							handleMenuClick(e, i);
							setvalue(1);
							handleClose();
						}}
						selected={i === selectedIndex && value === 1}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</React.Fragment>
	);

	const drawer = (
		<React.Fragment>
			<SwipeableDrawer
				disableBackdropTransition={!IOS}
				disableDiscovery={IOS}
				open={openDrawer}
				onClose={() => setopenDrawer(false)}
				onOpen={() => setopenDrawer(true)}
			>
				EXAMPLE DRAWER
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setopenDrawer(!openDrawer)}
				disableRipple
			>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<ElevationScroll {...props}>
				<AppBar>
					<Toolbar disableGutters>
						<Button
							className={classes.logoContainer}
							component={Link}
							to="/"
							onClick={logoClickHandler}
							disableRipple
						>
							<img className={classes.logo} src={logo} alt="company logo" />
						</Button>
						{!matches && tabs}
						{matches && drawer}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
}
