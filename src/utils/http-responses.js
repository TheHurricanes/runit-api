const successResponse = ({ res, data, message }) =>
	res.status(200).send({ success: true, data, message });

const failureResponse = ({ res, error, code = 400, message = "Not Found" }) =>
	res.status(code).send({ success: false, error, message });

const emptyResponse = res => res.status(204).send();

export { successResponse, failureResponse, emptyResponse };
