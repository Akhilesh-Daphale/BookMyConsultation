import { Typography } from "@material-ui/core";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import AppointmentCard from "../../common/card/appointmentCard/AppointmentCard";
import AppContext from "../../store/context";
import { getRequest } from "../../util/fetch";
import {
	internalServerError,
	ok,
	unauthorizedOrForbidden,
} from "../../util/response";
import APP_URL from "../../util/urls";
import RateAppoinment from "./RateAppointment";

/**
 * Appointments page
 */
const Appointment = () => {
	// State
	const [appointmentList, setAppointmentList] = useState([]);
	const [rateAppoinmentIsOpen, setRateAppoinmentOpen] = useState(false);
	const [appointmentDetails, setAppointmentDetails] = useState({});

	// Context
	const { auth, notification } = useContext(AppContext);

	/**
	 * This method is used to get the user email id from the access token
	 */
	const fetchUserEmailId = useCallback(async () => {
		const rawResponse = await getRequest(APP_URL.USER_BY_TOKEN);

		if (ok(rawResponse)) {
			const response = await rawResponse.json();
			return response.emailId;
		} else {
			if (unauthorizedOrForbidden(rawResponse)) {
				const response = await rawResponse.json();
				notification.setDetails("error", response.message);
			} else if (internalServerError(rawResponse)) {
				notification.setDetails(
					"error",
					"Invalid user details provided, please login again!"
				);
			}
			return null;
		}
	}, [notification]);

	/**
	 * This method is used to get all the appointments of the user 
	 */
	const fetchUserAppointments = useCallback(
		async (userId) => {
			const rawResponse = await getRequest(
				APP_URL.APPOINTMENTS_BY_USER_ID(userId)
			);

			if (ok(rawResponse)) {
				const response = await rawResponse.json();
				setAppointmentList(response);
			} else {
				if (unauthorizedOrForbidden(rawResponse)) {
					const response = await rawResponse.json();
					notification.setDetails("error", response.message);
				}
			}
		},
		[notification]
	);

	/**
	 * This method is used to show the rate appointment modal
	 */
	const showRateAppointmentModal = (appointment) => {
		setAppointmentDetails(appointment);
		setRateAppoinmentOpen(true);
	}

	useEffect(() => {
		/**
		 * This method is used to fill the appointments list if user is logged in
		 */
		const fillAppointmentsList = async () => {
			if (auth.isLoggedIn) {
				const emailId = await fetchUserEmailId();
				if (emailId !== null) {
					fetchUserAppointments(emailId);
				}
			}
		};

		fillAppointmentsList();
	}, [auth.isLoggedIn, fetchUserEmailId, fetchUserAppointments]);

	return (
		<Fragment>
			{!auth.isLoggedIn && (
				<Typography>Login to see appointments</Typography>
			)}
			{auth.isLoggedIn &&
				appointmentList.map((appointment) => {
					return (
						<AppointmentCard
							key={appointment.appointmentId}
							appointment={appointment}
							onRateAppoinment={showRateAppointmentModal}
						/>
					);
				})}
			{rateAppoinmentIsOpen && (
				<RateAppoinment
					modalIsOpen={rateAppoinmentIsOpen}
					onModalClose={() => {
						setRateAppoinmentOpen(false);
					}}
					appointmentDetails={appointmentDetails}
				/>
			)}
		</Fragment>
	);
};

export default Appointment;
