import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import AppModal from "../../common/modal/AppModal";
import classes from "./DoctorDetails.module.css";

/**
 * Card component to show doctor details
 */
const DoctorDetails = (props) => {
	const { doctorDetails } = props;

	return (
		<AppModal
			isOpen={props.modalIsOpen}
			onRequestClose={props.onModalClose}
			title="Doctor Details"
		>
			<div className={classes.card}>
				<Typography className={classes.name}>
					{`Dr : ${doctorDetails.firstName} ${doctorDetails.lastName}`}
				</Typography>
				<Typography className={classes.details}>
					{`Total Experience : ${doctorDetails.totalYearsOfExp} years`}
				</Typography>
				<Typography className={classes.details}>
					{`Speciality : ${doctorDetails.speciality}`}
				</Typography>
				<Typography className={classes.details}>
					{`Date of Birth : ${doctorDetails.dob}`}
				</Typography>
				<Typography className={classes.details}>
					{`City: ${doctorDetails.address.city}`}
				</Typography>
				<Typography className={classes.details}>
					{`Email : ${doctorDetails.emailId}`}
				</Typography>
				<Typography className={classes.details}>
					{`Mobile: ${doctorDetails.mobile}`}
				</Typography>
				<Typography className={classes.details}>
					Rating:{" "}
					<Rating
						value={doctorDetails.rating}
						size="small"
						readOnly
					/>
				</Typography>
			</div>
		</AppModal>
	);
};

export default DoctorDetails;
