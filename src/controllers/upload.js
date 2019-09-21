import upload from "../services/firebase";
import { successResponse, failureResponse } from "../utils/http-responses";

const uploadData = async (req, res) => {
	try {
		upload(req.body);
	} catch (err) {
		failureResponse({ res, message: err.message });
	}
};
