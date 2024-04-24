function ValidRandomTest(values) {
	let error = {};

	if (values.name === "" ) { error.name = "Name should not be empty";}
	else { error.name = ""}

	if (values.subject === "" ) { error.subject = "Subject should not be empty";}
	else {error.subject = ""}


	if (values.numberOfQuestions === "") { error.numberOfQuestions = "Number of questions must be greater than 0";}
	else {error.numberOfQuestions = ""}

	if (values.point === "" ) { error.point = "Point should not be empty"; }
	else if (values.point <= 0) { error.point = "Point must be greater than 0";}
	else { error.point = ""}

	if (values.duration === "" ) { error.duration = "Duration should not be empty";}
	else if (values.duration <= 0) { error.duration = "Duration must be a positive number";}
	else { error.duration = ""}

	if (values.date === "" ) { error.date = "Date should not be empty";}
	// else if (values.duration <= 0) { error.duration = "Duration must be a positive number";}
	else { error.date = ""}

	return error;
}

export default ValidRandomTest;
