function Validation(values) {
	let error = {name:"a"};
	const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

	if (values.name === "" ) {
		error.name = "Name should not be empty";
	}
	else {
		error.name = ""
	}

	if (values.organisation === "" ) {
		error.organisation = "Organisation should not be empty";
	}
	else {
		error.organisation = ""
	}

	if (values.email === "" ) {
		error.email = "Email should not be empty";
	}
	else if (!email_pattern.test(values.email)) {
		error.email = "Email Didn't match";
	}
	else {
		error.email = ""
	}

	if (values.specPasscode === "" ) {
		error.specPasscode = "Specific Passcode should not be empty";
	}
	else {
		error.specPasscode = ""
	}

	if (values.password === "" ) {
		error.password = "Password should not be empty";
	}
	else if (!password_pattern.test(values.password)) {
		error.password = "Password must have at least one alphabetic character and one digit.\nThe minimum length of the password must be 8.";
	}
	else {
		error.password = ""
	}
	return error;
}

export default Validation;