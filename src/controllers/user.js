import { successResponse, failureResponse } from "../utils/http-responses";
import User from "../models/user.model";

const addUser = async (req, res) => {
	if (!req.body.username) {
		failureResponse({
			res,
			message: "Missing 'username' parameter in the body"
		});
	}

	if (!req.body.email) {
		failureResponse({ res, message: "Missing 'email' parameter in the body" });
	}

	if (!req.body.avatar) {
		failureResponse({ res, message: "Missing 'avatar' parameter in the body" });
	}

	const user = {
		username: req.body.username,
		email: req.body.email,
		avatar: req.body.avatar
	};

	try {
		const createdUser = await User.create(user);
		successResponse({ res, data: { id: createdUser.id } });
	} catch (e) {
		failureResponse({ res, message: e.message });
	}
};

export { addUser };
