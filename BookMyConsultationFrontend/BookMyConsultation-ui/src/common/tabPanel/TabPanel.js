import classes from "./TabPanel.module.css";

/**
 * Parent component for all tab data
 */
const TabPanel = (props) => {
	const { children, value, index } = props;

	return (
		<div className={`${classes["tab-panel"]} ${value === index ? classes.dispFlex : classes.dispNone}`}>
			{value === index && children}
		</div>
	);
};

export default TabPanel;
