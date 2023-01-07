module.exports.validateRegisterInput = (
	username,
	email,
	password,
	confirmPassword
) => {
	const errors = {};
	if (username.trim() === "") {
		errors.username = "Please enter username";
	}
	if (email.trim() === "") {
		errors.email = "Please enter email";
	} else {
		const regEx =
			/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

		if (!email.match(regEx)) {
			errors.email = "Email must in valid email format";
		}
	}
	if (password === "") {
		errors.password = "Password must not be empty";
	} else if (password !== confirmPassword) {
		errors.confirmPassword = "Passwords does not match";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports.validateLoginInput = (username, password) => {
	const errors = {};
	if (username.trim() === "") {
		errors.username = "Please enter username";
	}
	if (password.trim() === "") {
		errors.password = "Please enter password";
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
