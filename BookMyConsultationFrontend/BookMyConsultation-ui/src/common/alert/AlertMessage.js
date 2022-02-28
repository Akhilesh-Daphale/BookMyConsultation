import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useContext } from "react";
import AppContext from "../../store/context";

/**
 * Component is used to show messages to the user 
 */
const AlertMessage = () => {

	const { notification } = useContext(AppContext);

	const closeHandler = () => {
		notification.request(false);
	}

	return (
		<Snackbar
			open={notification.isRequested}
			autoHideDuration={5000}
			anchorOrigin={{vertical: "bottom", horizontal: "left"}}
			onClose={closeHandler}
		>
			<Alert variant="filled" severity={notification.severity}>
				{notification.message}
			</Alert>
		</Snackbar>
	);
};

export default AlertMessage;
