import { successResponse, failureResponse } from "../utils/http-responses";


const QRlogin = async (req, res) => {
	var unirest = require("unirest");

	var request = unirest("GET", "https://pierre2106j-qrcode.p.rapidapi.com/api");

	request.query({
		"backcolor": "ffffff",
		"pixel": 10,
		"ecl": "M",
		"forecolor": "000000",
		"type": "text",
		"text": req.query.sessionId,
	});
	
	request.headers({
		"x-rapidapi-host": "pierre2106j-qrcode.p.rapidapi.com",
		"x-rapidapi-key": "fc75185558msh06c3180c89bc398p1b7309jsna44e69b2617f"
	});
	
	
	request.end(function (response) {
		if (response.error) failureResponse({ res, error: response.error });

		successResponse({ res, data: response.body });
	});
};

const registerQRAttemp = async (req, res) => {

};



export { registerQRAttemp, QRlogin };
