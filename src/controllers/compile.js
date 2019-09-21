import axios from 'axios';
import endpoints from '../utils/endpoints';
import { successResponse, failureResponse } from '../utils/http-responses';

const compile = async (req, res) => {
	/**
	 * Request Body
	 * {
	 * "script": ""
	 * "language": ""
	 * }
	 *
	*/
	console.log('Request to compile...')
  if (!req.body.script && !req.body.language) {
    failureResponse({ res, message: "Missing 'script' and 'language' parameters in the body" });
  }

  if (!req.body.script) {
    failureResponse({ res, message: "Missing 'script' parameter in the body" });
  }

  if (!req.body.language) {
    failureResponse({ res, message: "Missing 'language' parameter in the body" });
  }

  const options = {
    script: req.body.script,
    language: req.body.language,
    stdin: req.body.stdin,
    versionIndex: '0',
    clientId: process.env.JDOODLE_ID,
    clientSecret: process.env.JDOODLE_SECRET,
  };

  axios
    .post(endpoints.jdoodle, options)
    .then((response) => {
      successResponse({
        res,
        data: response.data,
      });
    })
    .catch((error) => {
      failureResponse({
        res,
        error: error.stack,
        message: error.message,
      });
    });
};

export { compile };
