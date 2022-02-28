import { useState } from "react";
import Login from "../login/Login";
import Register from "../register/Register";
import TabContainer from "../../common/tabContainer/TabContainer";
import AppModal from "../../common/modal/AppModal";
import TabPanel from "../../common/tabPanel/TabPanel";

/**
 * User authentication modal
 */
const Auth = (props) => {
	// State
	const [indexValue, setIndexValue] = useState(0);

	const indexValueHandler = (event, newValue) => {
		setIndexValue(newValue);
	};

	return (
		<AppModal
			isOpen={props.modalIsOpen}
			onRequestClose={props.onModalClose}
			title="Authentication"
		>
			<TabContainer
				value={indexValue}
				valueHandler={indexValueHandler}
				tabNames={["Login", "Register"]}
				variant="scrollable"
			/>
			<TabPanel value={indexValue} index={0}>
				<Login onModalClose={props.onModalClose} />
			</TabPanel>
			<TabPanel value={indexValue} index={1}>
				<Register onModalClose={props.onModalClose} />
			</TabPanel>
		</AppModal>
	);
};

export default Auth;
