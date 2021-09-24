import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Tabs, Tab, Button } from "@material-ui/core";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";

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
	},

	logoContainer: {
		padding: 0,
		"&:hover": {
			backgroundColor: "transparent",
		},
	},

	logo: {
		height: "8em",
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
}));

export default function ElevateAppBar(props) {
	const classes = useStyles();
	const [value, setvalue] = useState(0);

	const handleChange = (e, value) => {
		setvalue(value);
	};

	const logoClickHandler = () => {
		handleChange(null, 0);
	};

	useEffect(() => {
		let current_path = window.location.pathname;

		if (current_path === "/" && value !== 0) {
			setvalue(0);
		} else if (current_path === "/services" && value !== 1) {
			setvalue(1);
		} else if (current_path === "/revolution" && value !== 2) {
			setvalue(2);
		} else if (current_path === "/about" && value !== 3) {
			setvalue(3);
		} else if (current_path === "/contact" && value !== 4) {
			setvalue(4);
		}
	}, [value]);

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
						<Tabs
							value={value}
							onChange={handleChange}
							className={classes.tabContainer}
							indicatorColor="primary"
						>
							<Tab
								className={classes.tab}
								component={Link}
								to="/"
								label="Home"
							/>
							<Tab
								className={classes.tab}
								component={Link}
								to="/services"
								label="Services"
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
							className={classes.button}
						>
							Free Estimate
						</Button>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
}
