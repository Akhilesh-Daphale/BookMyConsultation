import {
	Button,
	FormControl,
	FormHelperText,
	TextField,
	Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useState, useContext } from "react";
import FormCard from "../../common/card/formCard/FormCard";
import AppModal from "../../common/modal/AppModal";
import { postRequest } from "../../util/fetch";
import APP_URL from "../../util/urls";
import { ok, unauthorizedOrForbidden } from "../../util/response";
import AppContext from "../../store/context";


/**
 * Rate appointment modal
 */
const RateAppoinment = (props) => {
	// State
	const [ratingDetails, setRatingDetails] = useState({
		comment: "",
		rating: 0,
	});
	const [ratingError, setRatingError] = useState(false);

	// Context
	const { notification } = useContext(AppContext);

	// Props
	const { appointmentDetails } = props;

	const commentChangeHandler = (event) => {
		setRatingDetails((prevState) => {
			return {
				...prevState,
				comment: event.target.value,
			};
		});
	};

	const ratingChangeHandler = (event, newValue) => {
		setRatingDetails((prevState) => {
			return {
				...prevState,
				rating: newValue,
			};
		});
		if (ratingError) {
			setRatingError(false);
		}
	};

	/**
	 * This method is used to rate an appointment
	 */
	const rateAppointment = async (ratingData) => {
		const rawResponse = await postRequest(
			APP_URL.RATE_APPOINTMENT,
			ratingData
		);

		if (ok(rawResponse)) {
			notification.setDetails("success", "Appointment Rating Successful");
			return true;
		} else {
			if(unauthorizedOrForbidden(rawResponse)) {
				const response = await rawResponse.json();
				notification.setDetails("error", response.message);
			}

			return false;
		}
	};

	/**
	 * This method is used to handle the form submit request
	 */
	const submitHandler = async (event) => {
		event.preventDefault();
		// Validate rating
		if (ratingDetails.rating === 0) {
			setRatingError(true);
			return;
		}

		const ratingData = {
			appointmentId: appointmentDetails.appointmentId,
			doctorId: appointmentDetails.doctorId,
			rating: ratingDetails.rating,
			comments: ratingDetails.comment,
		};

		const ratingStatus = await rateAppointment(ratingData);
		if (!ratingStatus) {
			return;
		}

		props.onModalClose();
	};

	return (
		<AppModal
			isOpen={props.modalIsOpen}
			onRequestClose={props.onModalClose}
			title="Rate an Appointment"
		>
			<FormCard onSubmit={submitHandler} padding>
				{/* Comment field */}
				<FormControl margin="normal" className="form-input">
					<TextField
						label="Comments"
						multiline
						rows={4}
						value={ratingDetails.comment}
						onChange={commentChangeHandler}
					/>
				</FormControl>
				{/* Rating field */}
				<FormControl margin="normal" className="form-input">
					<Typography>
						Rating:{" "}
						<Rating
							name="rate-appointment"
							size="small"
							value={ratingDetails.rating}
							onChange={ratingChangeHandler}
						/>
					</Typography>
					<FormHelperText style={{ color: "red" }}>
						{ratingError && "Submit a rating"}
					</FormHelperText>
				</FormControl>
				<br />
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="form-btn2"
				>
					Rate Appointment
				</Button>
			</FormCard>
		</AppModal>
	);
};

export default RateAppoinment;
