import { Button, Paper, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import classes from "./DoctorCard.module.css";

/**
 * Component is used for showing the available doctor
 */
const DoctorCard = (props) => {
	const { doctor } = props;

	return (
		<Paper elevation={2} className={classes.card}>
			<Typography className={classes.name}>
				{`Doctor Name: ${doctor.firstName} ${doctor.lastName}`}
			</Typography>
			<Typography className={classes.details}>
				{`Speciality: ${doctor.speciality}`}
			</Typography>
			<Typography className={classes.details}>
				Rating:{" "}
				<Rating
					value={doctor.rating}
					size="small"
					readOnly
					className={classes.rating}
				/>
			</Typography>
			<Button
				variant="contained"
				color="primary"
				size="small"
				className={classes.btn}
				onClick={() => {props.onBookAppointment(doctor)}}
			>
				Book Appointment
			</Button>
			<Button
				variant="contained"
				color="secondary"
				size="small"
				className={`${classes.btn} ${classes["details-btn"]}`}
				onClick={() => {props.onDoctorDetails(doctor)}}
			>
				View Details
			</Button>
		</Paper>
	);
};

export default DoctorCard;
