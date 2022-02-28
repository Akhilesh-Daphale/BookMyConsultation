import { Fragment, useContext } from "react";
import { Button } from "@material-ui/core";
import LogoImg from "../../assets/logo.jpeg";
import classes from "./Header.module.css";
import AppContext from "../../store/context";

/**
 * Application header component 
 */
const Header = (props) => {

	// Context
	const { auth } = useContext(AppContext);

	return (
		<Fragment>
			<div className={classes["app-header"]}>
				<div className={classes["logo-container"]}>
					<img src={LogoImg} alt="app logo" />
					<span>Doctor Finder</span>
				</div>
				<div className={classes["btn-container"]}>
					{!auth.isLoggedIn && (
						<Button
							className={classes.btn}
							variant="contained"
							color="primary"
							onClick={props.onLoginClick}
						>
							Login
						</Button>
					)}
					{auth.isLoggedIn && (
						<Button
							className={classes.btn}
							variant="contained"
							color="secondary"
							onClick={auth.logout}
						>
							Logout
						</Button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Header;
