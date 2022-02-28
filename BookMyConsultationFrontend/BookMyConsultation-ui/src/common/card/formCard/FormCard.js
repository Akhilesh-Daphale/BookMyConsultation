import classes from "./FormCard.module.css";


/**
 * Parent component for all form components
 */
const FormCard = (props) => {
	const { padding, centerAligned } = props;

	const className = `${classes.form} ${padding ? classes.padding : ""} ${
		centerAligned ? classes["center-alignment"] : ""
	}`;

	return (
		<form onSubmit={props.onSubmit} className={className}>
			{props.children}
		</form>
	);
};

export default FormCard;
