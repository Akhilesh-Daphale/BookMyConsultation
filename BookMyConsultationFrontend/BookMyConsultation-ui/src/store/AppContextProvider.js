import { useState, useEffect } from "react";
import { postRequest, userLogin } from "../util/fetch";
import { ok, unauthorizedOrForbidden } from "../util/response";
import APP_URL from "../util/urls";
import AppContext from "./context";


const AppContextProvider = (props) => {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [notifyRequested, setNotifyRequested] = useState(false);
	const [notifyDetails, setNotifyDetails] = useState({
		severity: "",
		message: "",
	});

	useEffect(() => {
		const token = sessionStorage.getItem("access-token");
		if (token !== null) {
			setIsLoggedIn(true);
		}
	}, []);

	/**
	 * This method handles the notification of the api response call.
	 */
	const notificationDetailsHandler = (severity, message) => {
		setNotifyDetails({
			severity: severity,
			message: message,
		});
		setNotifyRequested(true);
	};

	/**
	 * This method gives a api call for loggin in to the backend service.
	 */
	const loginHandler = async (email, password, closeModal) => {
		const userDetails = window.btoa(`${email}:${password}`);

		const rawResponse = await userLogin(userDetails);
		if (ok(rawResponse)) {
			const response = await rawResponse.json();
			notificationDetailsHandler("success", "Login Successful");
			sessionStorage.setItem("access-token", response.accessToken);
			setIsLoggedIn(true);
			closeModal();
		} else {
			if (unauthorizedOrForbidden(rawResponse)) {
				const response = await rawResponse.json();
				notificationDetailsHandler("error", response.message);
			}
		}
	};

	/**
	 * This method gives a api call for loggin out of the backend service.
	 */
	const logoutHandler = async () => {
		const rawResponse = await postRequest(APP_URL.USER_LOGOUT);

		if (unauthorizedOrForbidden(rawResponse)) {
			const response = await rawResponse.json();
			notificationDetailsHandler("error", response.message);
		}
		
		// No matter the status of the api call is clear the session storage
		sessionStorage.clear();
		setIsLoggedIn(false);
	};

	const context = {
		notification: {
			isRequested: notifyRequested,
			request: setNotifyRequested,
			setDetails: notificationDetailsHandler,
			severity: notifyDetails.severity,
			message: notifyDetails.message,
		},
		auth: {
			isLoggedIn: isLoggedIn,
			login: loginHandler,
			logout: logoutHandler,
		},
	};

	return (
		<AppContext.Provider value={context}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
