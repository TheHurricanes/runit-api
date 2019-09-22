import { successResponse, failureResponse } from "../utils/http-responses";
const QRlogin = async (req, res) => {
	const io = require("socket.io-client");
	const socket = io.connect("http://localhost:3020");
	socket.emit("register", req.query.email, "");

	successResponse({ res, message: "OK" });
};
export { QRlogin };
