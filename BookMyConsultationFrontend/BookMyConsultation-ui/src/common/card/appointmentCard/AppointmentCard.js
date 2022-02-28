import { Button, Paper, Typography } from "@material-ui/core";
import classes from "./AppointmentCard.module.css";

/**
 * Component is used for showing the booked appointment
 */
const AppointmentCard = (props) => {

    const { appointment } = props;

    return (
        <Paper elevation={2} className={classes.card}>
            <Typography className={classes.name}>
				{`Dr : ${appointment.doctorName}`}
			</Typography>
            <Typography className={classes.details}>
				{`Date : ${appointment.appointmentDate}`}
			</Typography>
            <Typography className={classes.details}>
				{`Symptoms : ${appointment.symptoms}`}
			</Typography>
            <Typography className={classes.details}>
				{`Prior Medical History : ${appointment.symptoms}`}
			</Typography>
            <br />
            <Button
				variant="contained"
				color="primary"
				size="small"
				onClick={() => {props.onRateAppoinment(appointment)}}
			>
				Rate Appointment
			</Button>
        </Paper>
    );
}

export default AppointmentCard;