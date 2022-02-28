import { Tab, Tabs } from "@material-ui/core";
import classes from "./TabContainer.module.css";

/**
 * Components to show the tabs
 */
const TabContainer = (props) => {
	return (
		<Tabs
			value={props.value}
			onChange={props.valueHandler}
			className={classes["tabs-container"]}
			variant={props.variant}
		>
			{props.tabNames.map((tabName) => {
				return (
					<Tab
						key={tabName}
						label={tabName}
						className={classes.tab}
					/>
				);
			})}
		</Tabs>
	);
};

export default TabContainer;
