import { successResponse, failureResponse } from "../utils/http-responses";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
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
		avatar: req.body.avatar,
		password: bcrypt.hashSync(req.body.password, 10)
	};
	try {
		const createdUser = await User.create(user);
		successResponse({ res, data: { id: createdUser.id } });
	} catch (e) {
		failureResponse({ res, message: e.message });
	}
};

const signin = async (req, res) => {
	const { email, password } = req.body;

	if (!email) {
		failureResponse({ res, message: "Missing 'email' parameter in the body" });
	}
	if (!password) {
		failureResponse({
			res,
			message: "Missing 'password' parameter in the body"
		});
	}
	try {
		const signedUser = await User.findOne({ email: req.body.email });
		if (!signedUser) {
			failureResponse({ res, data: "We could not find that email." });
		} else {
			bcrypt.compare(password, signedUser.password, (err, resp) => {
				if (resp) {
					successResponse({ res, data: signedUser });
				} else {
					failureResponse({ res, data: "Invalid credentials." });
				}
			});
		}
	} catch (e) {
		failureResponse({ res, message: e.message });
	}
};

const getUser = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		failureResponse({ res, message: "Missing 'email' parameter in the body" });
	}
	const requrestedUser = await User.findOne({ email: req.body.email });
	if (!requrestedUser) {
		failureResponse({ res, data: "We could not find that user." });
	}
	successResponse({ res, data: requrestedUser });
};

export { signup, signin, getUser };
