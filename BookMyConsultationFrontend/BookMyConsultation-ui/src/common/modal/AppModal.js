import { Typography } from "@material-ui/core";
import Modal from "react-modal";
import classes from "./AppModal.module.css";


Modal.setAppElement(document.getElementById("root"));

/**
 * Application modal card components
 */
const AppModal = (props) => {
    return (
        <Modal
			isOpen={props.isOpen}
			onRequestClose={props.onRequestClose}
			className={classes.modal}
            onAfterClose={props.onAfterClose}
		>
            <Typography className={classes.heading}>{props.title}</Typography>
            {props.children}
        </Modal>
    );
}

export default AppModal;