import { useContext, useState } from "react";
import FormCard from "../../common/card/formCard/FormCard";
import AppContext from "../../store/context";
import {
	Button,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
} from "@material-ui/core";

/**
 * Login form
 */
const Login = (props) => {

	// State
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState(false);
	const { auth } = useContext(AppContext);

	const emailChangeHandler = (event) => {
		setEmail(event.target.value);
		// Remove errors once user starts typing
		if(emailError) {
			setEmailError(false);
		}
	};

	const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	/**
	 * This method is used to handle the form submit request
	 */
	const submitHandler = (event) => {
		event.preventDefault();
		// Validate inputs
		if (!email.includes("@") || !email.includes(".com")) {
			setEmailError(true);
			return;
		}

		auth.login(email, password, props.onModalClose);
	};

	return (
		<FormCard onSubmit={submitHandler} centerAligned>
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
			<br />
			{/* Submit button */}
			<Button
				type="submit"
				variant="contained"
				color="primary"
				className="form-btn"
			>
				Login
			</Button>
		</FormCard>
	);
};

export default Login;
