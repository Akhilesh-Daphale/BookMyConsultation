import { Fragment, useState } from "react";
import TabContainer from "../../common/tabContainer/TabContainer";
import TabPanel from "../../common/tabPanel/TabPanel";
import Appointment from "../appointment/Appointment";
import DoctorList from "../doctorList/DoctorList";

/**
 * Application home page
 */
const Home = () => {
	// State
	const [indexValue, setIndexValue] = useState(0);

	const indexValueHandler = (event, newValue) => {
		setIndexValue(newValue);
	};

	return (
		<Fragment>
			<TabContainer
				value={indexValue}
				valueHandler={indexValueHandler}
				tabNames={["Doctors", "Appointments"]}
				variant="fullWidth"
			/>
			<TabPanel value={indexValue} index={0}>
				<DoctorList />
			</TabPanel>
			<TabPanel value={indexValue} index={1}>
				<Appointment />
			</TabPanel>
		</Fragment>
	);
};

export default Home;
