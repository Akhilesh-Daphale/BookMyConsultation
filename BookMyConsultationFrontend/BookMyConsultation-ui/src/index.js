import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Controller from "./screens/Controller";
import AppContextProvider from "./store/AppContextProvider";

ReactDOM.render(
	<AppContextProvider>
		<Controller />
	</AppContextProvider>,
	document.getElementById("root")
);
