function Validation(values) {
	let error = {};

	if (values.email === "" ) {
		error.email = "Email should not be empty";
	}
	else {
		error.email = ""
	}

	if (values.password === "" ) {
		error.password = "Password should not be empty";
	}
	else {
		error.password = ""
	}

	if (values.specPasscode === "" ) {
		error.specPasscode = "Specific Passcode should not be empty";
	}
	else {
		error.specPasscode = ""
	}
	return error;
}

export default Validation;