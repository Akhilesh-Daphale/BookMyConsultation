import { Fragment, useState } from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AlertMessage from "../common/alert/AlertMessage";
import Header from "../common/header/Header";
import Auth from "./auth/Auth";

const Controller = () => {
	// State
	const [authModalIsOpen, setAuthModelOpen] = useState(false);

	return (
		<Router>
			<Fragment>
				{/* Header */}
				<Header
					onLoginClick={() => {
						setAuthModelOpen(true);
					}}
				/>
				{/* Alert Message */}
				<AlertMessage />
				{/* Authentication modal */}
				{authModalIsOpen && (
					<Auth
						modalIsOpen={authModalIsOpen}
						onModalClose={() => {
							setAuthModelOpen(false);
						}}
					/>
				)}
				{/* Home page */}
				<Route exact path="/">
					<Home />
				</Route>
			</Fragment>
		</Router>
	);
};

export default Controller;
