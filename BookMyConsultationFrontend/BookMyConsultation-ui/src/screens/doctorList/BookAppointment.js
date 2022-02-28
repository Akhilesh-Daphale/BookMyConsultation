import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { useContext, useState } from "react";
import AppModal from "../../common/modal/AppModal";
import FormCard from "../../common/card/formCard/FormCard";
import AppContext from "../../store/context";
import { getRequest, postRequest } from "../../util/fetch";
import APP_URL from "../../util/urls";
import { badRequest, internalServerError, ok, unauthorizedOrForbidden } from "../../util/response";

/**
 * Book appointment modal
 */
const BookAppointment = (props) => {

	const initialState = {
		appointmentDate: new Date(),
		timeSlot: "",
		symptoms: "",
		medicalHistory: "",
	};

	// State
	// Apointment details state is used as an object to avoid unecessary rerendering while resetting
	const [appointmentDetails, setAppointmentDetails] = useState(initialState);
	const [timeSlotList, setTimeSlotList] = useState([]);
	const [timeSlotError, setTimeSlotError] = useState(false);

	// Props
	const { doctorDetails } = props;

	// Context
	const { notification } = useContext(AppContext);

	/**
	 * This method is used to reset the component state
	 */
	const resetStateToInitialState = () => {
		setAppointmentDetails(initialState);
		setTimeSlotError(false);
		setTimeSlotList([]);
	};

	const getISODate = (date) => {
		return date.toISOString().split("T")[0];
	};

	const getDoctorFullName = () => {
		return `${doctorDetails.firstName} ${doctorDetails.lastName}`;
	};

	const appointmentDateChangeHandler = (newValue) => {
		setAppointmentDetails((prevState) => {
			return {
				...prevState,
				appointmentDate: newValue,
			};
		});

		// Once appointment date is changed fetch doctor timeslots
		fetchDoctorTimeSlots(doctorDetails.id, getISODate(newValue));
	};

	const timeSlotChangeHandler = (event) => {
		setAppointmentDetails((prevState) => {
			return {
				...prevState,
				timeSlot: event.target.value,
			};
		});
		// Remove errors once user selects time slot
		if(timeSlotError) {
			setTimeSlotError(false);
		}
	};

	const medicalHistoryChangeHandler = (event) => {
		setAppointmentDetails((prevState) => {
			return {
				...prevState,
				medicalHistory: event.target.value,
			};
		});
	};

	const symptomsChangeHandler = (event) => {
		setAppointmentDetails((prevState) => {
			return {
				...prevState,
				symptoms: event.target.value,
			};
		});
	};

	/**
	 * This method is used to fetch the user details from the access token
	 */
	const fetchUserDetails = async () => {
		const rawResponse = await getRequest(APP_URL.USER_BY_TOKEN);

		if(ok(rawResponse)) {
			const response = await rawResponse.json();
			return response;
		} else {
			if(unauthorizedOrForbidden(rawResponse)) {
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
	};

	/**
	 * This method is used to fetch the doctor timeslots
	 */
	const fetchDoctorTimeSlots = async (doctorId, appointmentDate) => {
		const rawResponse = await getRequest(
			APP_URL.DOCTOR_TIMESLOT(doctorId, appointmentDate)
		);

		if(ok(rawResponse)) {
			const response = await rawResponse.json();
			setTimeSlotList(response.timeSlot);
		} else {
			notification.setDetails(
				"error",
				"Invalid parmeters provided, try again!"
			);
		}
	};

	/**
	 * This method is used to book appointment
	 */
	const bookAppointment = async (appointmentData) => {
		const rawResponse = await postRequest(
			APP_URL.BOOK_APPOINTMENT,
			appointmentData
		);

		if (ok(rawResponse)) {
			notification.setDetails(
				"success",
				"Appointment Booked Successfully"
			);
			return true;
		} else {
			if (unauthorizedOrForbidden(rawResponse)) {
				const response = await rawResponse.json();
				notification.setDetails("error", response.message);
			} else if(badRequest(rawResponse)) {
				notification.setDetails(
					"error",
					"Either the slot is already booked or not available"
				);
			}

			return false;
		}
	};

	/**
	 * This method is used to handle the form submit request
	 */
	const submitHandler = async (event) => {
		event.preventDefault();
		// Validate timeslot
		if (appointmentDetails.timeSlot === "") {
			setTimeSlotError(true);
			return;
		}
		// Get user details
		const userDetails = await fetchUserDetails();
		if (userDetails === null) {
			return;
		}

		const appointmentData = {
			doctorId: doctorDetails.id,
			doctorName: getDoctorFullName(),
			userId: userDetails.emailId,
			userName: `${userDetails.firstName} ${userDetails.lastName}`,
			userEmailId: userDetails.emailId,
			timeSlot: appointmentDetails.timeSlot,
			appointmentDate: getISODate(appointmentDetails.appointmentDate),
			symptoms: appointmentDetails.symptoms,
			priorMedicalHistory: appointmentDetails.medicalHistory === "" ? "NA" : appointmentDetails.medicalHistory,
		};

		const bookingStatus = await bookAppointment(appointmentData);
		if (!bookingStatus) {
			return;
		}

		props.onModalClose();
	};

	return (
		<AppModal
			isOpen={props.modalIsOpen}
			onRequestClose={props.onModalClose}
			title="Book an Appointment"
			onAfterClose={resetStateToInitialState}
		>
			<FormCard onSubmit={submitHandler} padding>
				{/* Doctor name field */}
				<TextField
					disabled
					required
					label="Doctor Name"
					margin="normal"
					value={getDoctorFullName()}
					className="form-input"
				/>
				{/* Appointment field */}
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						variant="inline"
						format="MM/dd/yyyy"
						label="Apointment date"
						margin="normal"
						minDate={Date.now()}
						className="form-input"
						value={appointmentDetails.appointmentDate}
						onChange={appointmentDateChangeHandler}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
				</MuiPickersUtilsProvider>
				{/* Time slot field */}
				<FormControl
					error={timeSlotError}
					margin="normal"
					className="form-input"
				>
					<InputLabel>Timeslot</InputLabel>
					<Select
						value={appointmentDetails.timeSlot}
						onChange={timeSlotChangeHandler}
					>
						{timeSlotList.map((timeslot) => {
							return (
								<MenuItem key={timeslot} value={timeslot}>
									{timeslot}
								</MenuItem>
							);
						})}
					</Select>
					<FormHelperText>
						{timeSlotError && "Select a time slot"}
					</FormHelperText>
				</FormControl>
				{/* Medical history field */}
				<FormControl margin="normal" className="form-input">
					<TextField
						label="Medical History"
						multiline
						rows={4}
						value={appointmentDetails.medicalHistory}
						onChange={medicalHistoryChangeHandler}
					/>
				</FormControl>
				{/* Symptoms field */}
				<FormControl margin="normal" className="form-input">
					<TextField
						label="Symptoms"
						multiline
						rows={4}
						value={appointmentDetails.symptoms}
						onChange={symptomsChangeHandler}
					/>
				</FormControl>
				<br />
				{/* Book appointment button */}
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="form-btn2"
				>
					Book Appointment
				</Button>
			</FormCard>
		</AppModal>
	);
};

export default BookAppointment;
