import React from "react";


const AppContext = React.createContext({
	notification: {
		isRequested: false,
		request: () => {},
		setDetails: (title, message) => {},
		severity: "",
		message: "",
	},
    auth: {
        isLoggedIn: false,
        login: (email, password) => {},
        logout: () => {},
		validateResponse: () => {}
    }
});

export default AppContext;
