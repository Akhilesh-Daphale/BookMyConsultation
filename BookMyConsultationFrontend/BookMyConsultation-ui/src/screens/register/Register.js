import { useState, useContext } from "react";
import FormCard from "../../common/card/formCard/FormCard";
import AppContext from "../../store/context";
import { userRegistration } from "../../util/fetch";
import {
	badRequest,
	ok,
	unauthorizedOrForbidden,
	unprocessableEntity,
} from "../../util/response";
import {
	Button,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
} from "@material-ui/core";

/**
 * Register form
 */
const Register = (props) => {

	// State
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [mobileError, setMobileError] = useState(false);
	const { notification } = useContext(AppContext);

	const firstNameChangeHandler = (event) => {
		setFirstName(event.target.value);
	};

	const lastNameChangeHandler = (event) => {
		setLastName(event.target.value);
	};

	const emailChangeHandler = (event) => {
		setEmail(event.target.value);
		// Remove errors once user starts typing
		if (emailError) {
			setEmailError(false);
		}
	};

	const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	const mobileNumberChangeHandler = (event) => {
		setMobileNumber(event.target.value);
		// Remove errors once user starts typing
		if (mobileError) {
			setMobileError(false);
		}
	};

	/**
	 * This method is used for registering user
	 */
	const registerUser = async (userDetails) => {
		const rawResponse = await userRegistration(userDetails);

		if (ok(rawResponse)) {
			notification.setDetails("success", "Registraton Successful");
			props.onModalClose();
		} else {
			if (unauthorizedOrForbidden(rawResponse)) {
				const response = await rawResponse.json();
				notification.setDetails("error", response.message);
			} else if (unprocessableEntity(rawResponse)) {
				notification.setDetails(
					"error",
					`User with email ${email} already exists`
				);
			} else if (badRequest(rawResponse)) {
				notification.setDetails("error", `Invalid details provided`);
			}
		}
	};

	/**
	 * This method is used to handle the form submit request
	 */
	const submitHandler = async (event) => {
		event.preventDefault();
		// Validate inputs
		if (!email.includes("@") || !email.includes(".com")) {
			setEmailError(true);
			return;
		} else if (mobileNumber.length !== 10 || isNaN(+mobileNumber)) {
			setMobileError(true);
			return;
		}

		const userDetails = {
			emailId: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
			mobile: mobileNumber,
		};

		registerUser(userDetails);
	};

	return (
		<FormCard onSubmit={submitHandler} centerAligned>
			{/* First name field */}
			<FormControl margin="normal" required className="form-input">
				<InputLabel htmlFor="firstName">First Name</InputLabel>
				<Input
					id="firstName"
					type="text"
					value={firstName}
					onChange={firstNameChangeHandler}
					autoComplete="off"
				/>
			</FormControl>
			{/* Last name field */}
			<FormControl margin="normal" required className="form-input">
				<InputLabel htmlFor="lastName">Last Name</InputLabel>
				<Input
					id="lastName"
					type="text"
					value={lastName}
					onChange={lastNameChangeHandler}
					autoComplete="off"
				/>
			</FormControl>
			{/* Email field */}
			<FormControl
				error={emailError}
				margin="normal"
				required
				className="form-input"
			>
				<InputLabel htmlFor="email">Email</InputLabel>
				<Input
					id="email"
					type="text"
					value={email}
					onChange={emailChangeHandler}
					autoComplete="off"
				/>
				<FormHelperText>
					{emailError ? "Enter valid Email" : ""}
				</FormHelperText>
			</FormControl>
			{/* Password field */}
			<FormControl margin="normal" required className="form-input">
				<InputLabel htmlFor="password">Password</InputLabel>
				<Input
					id="password"
					type="password"
					value={password}
					onChange={passwordChangeHandler}
					autoComplete="off"
				/>
			</FormControl>
			{/* Mobile number field */}
			<FormControl
				error={mobileError}
				margin="normal"
				required
				className="form-input"
			>
				<InputLabel htmlFor="mobile">Mobile no</InputLabel>
				<Input
					id="mobile"
					type="text"
					value={mobileNumber}
					onChange={mobileNumberChangeHandler}
					autoComplete="off"
				/>
				<FormHelperText>
					{mobileError ? "Enter valid mobile number" : ""}
				</FormHelperText>
			</FormControl>
			<br />
			{/* Register button */}
			<Button
				type="submit"
				variant="contained"
				color="primary"
				className="form-btn"
			>
				Register
			</Button>
		</FormCard>
	);
};

export default Register;
