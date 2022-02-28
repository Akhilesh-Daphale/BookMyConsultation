import { TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Fragment, useContext, useEffect, useState } from "react";
import AppContext from "../../store/context";
import { getRequest } from "../../util/fetch";
import APP_URL from "../../util/urls";
import classes from "./DoctorList.module.css";
import BookAppointment from "../doctorList/BookAppointment";
import DoctorDetails from "./DoctorDetails";
import DoctorCard from "../../common/card/doctorCard/DoctorCard";
import { ok } from "../../util/response";

/**
 * Doctors page
 */
const DoctorList = (props) => {
	// State
	const [doctorList, setDoctorList] = useState([]);
	const [specialityList, setSpecialityList] = useState([]);
	const [bookAppointmentIsOpen, setBookAppointmentOpen] = useState(false);
	const [doctorDetailsIsOpen, setDoctorDetailsOpen] = useState(false);
	const [appointmentDoctor, setAppointmentDoctor] = useState({});

	// Context
	const { notification, auth } = useContext(AppContext);

	/**
	 * This method is used to get all the specialities
	 */
	const fetchAllSpecialities = async () => {
		const rawResponse = await getRequest(APP_URL.DOCTOR_SPECIALITIES);

		if(ok(rawResponse)) {
			const response = await rawResponse.json();
			setSpecialityList(["", ...response]);
		}
	};

	/**
	 * This method is used to get all the doctors
	 */
	const fetchAllDoctors = async () => {
		const rawResponse = await getRequest(APP_URL.ALL_DOCTORS);

		if(ok(rawResponse)) {
			const response = await rawResponse.json();
			setDoctorList(response);
		}
	};

	/**
	 * This method is used to get all doctors for given speciality
	 */
	const fetchDoctorsBySpeciality = async (speciality) => {
		const rawResponse = await getRequest(
			APP_URL.ALL_DOCTORS_BY_SPECIALITY + speciality
		);

		if(ok(rawResponse)) {
			const response = await rawResponse.json();
			setDoctorList(response);
		}
	};

	const specialityChangeHandler = (event, newValue) => {
		if (newValue !== null) {
			fetchDoctorsBySpeciality(newValue);
		} else {
			fetchAllDoctors();
		}
	};

	/**
	 * This method is used to show the book appointment modal
	 */
	const showAppointmentModal = async (doctor) => {
		// Check if user is logged in, if not then return else proceed with booking an appointmnet
		if (!auth.isLoggedIn) {
			notification.setDetails("error", "Login to book appointment");
			return;
		}

		setAppointmentDoctor(doctor);
		setBookAppointmentOpen(true);
	};

	/**
	 * This method is used to show the doctor details modal
	 */
	const showDoctorDetailsModal = (doctor) => {
		setAppointmentDoctor(doctor);
		setDoctorDetailsOpen(true);
	};

	useEffect(() => {
		fetchAllSpecialities();
		fetchAllDoctors();
	}, []);

	return (
		<Fragment>
			{/* Speciality filter */}
			<div className={classes.filter}>
				<Typography>Select Speciality:</Typography>
				<Autocomplete
					options={specialityList}
					renderInput={(params) => (
						<TextField {...params} variant="filled" />
					)}
					onChange={specialityChangeHandler}
				/>
			</div>
			{/* Doctors list */}
			{doctorList.map((doctor) => {
				return (
					<DoctorCard
						key={doctor.id}
						doctor={doctor}
						onBookAppointment={showAppointmentModal}
						onDoctorDetails={showDoctorDetailsModal}
					/>
				);
			})}
			{/* Book appointment dialog */}
			{bookAppointmentIsOpen && (
				<BookAppointment
					modalIsOpen={bookAppointmentIsOpen}
					onModalClose={() => {
						setBookAppointmentOpen(false);
					}}
					doctorDetails={appointmentDoctor}
				/>
			)}
			{/* Doctor details dialog */}
			{doctorDetailsIsOpen && (
				<DoctorDetails
					modalIsOpen={doctorDetailsIsOpen}
					onModalClose={() => {
						setDoctorDetailsOpen(false);
					}}
					doctorDetails={appointmentDoctor}
				/>
			)}
		</Fragment>
	);
};

export default DoctorList;
