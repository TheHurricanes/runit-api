import { successResponse, failureResponse } from "../utils/http-responses";
import CodeSnippet from "../models/code.model";

const addCode = async (req, res) => {
	const snippet = {
		content: req.body.content,
		language: req.body.language,
		owner_id: req.body.owner_id,
		title: req.body.title
	};

	if (!req.body.content) {
		failureResponse({
			res,
			message: "Missing 'content' parameter in the body"
		});
	}

	if (!req.body.language) {
		failureResponse({
			res,
			message: "Missing 'language' parameter in the body"
		});
	}

	if (!req.body.owner_id) {
		failureResponse({
			res,
			message: "Missing 'owner_id' parameter in the body"
		});
	}

	await CodeSnippet.create(snippet);
	successResponse({ res, data: snippet });
};

const getUserSnippets = async (req, res) => {
	if (!req.body.owner_id) {
		failureResponse({
			res,
			message: "Missing 'owner_id' parameter in the body"
		});
	}
	const snippets = await CodeSnippet.find({ owner_id: req.body.owner_id });
	successResponse({ res, data: snippets });
};

const updateSnippet = async (req, res) => {
	if (!req.body.code_id) {
		failureResponse({
			res,
			message: "Missing 'code_id' parameter in the body"
		});
		return;
	}
	const snippet = await CodeSnippet.findOne({ _id: req.body.code_id });
	if (!snippet) {
		failureResponse({ res, data: "We could not find that snippet of code." });
	}
	for (let key in req.body) {
		if (key == "code_id") {
			continue;
		} else if (key == "content") {
			await CodeSnippet.updateOne(
				{ _id: req.body.code_id },
				{ $set: { content: req.body.content } }
			);
		} else if (key == "language") {
			await CodeSnippet.updateOne(
				{ _id: req.body.code_id },
				{ $set: { language: req.body.language } }
			);
		} else if (key == "title") {
			await CodeSnippet.updateOne(
				{ _id: req.body.code_id },
				{ $set: { title: req.body.title } }
			);
		} else {
			failureResponse({ res, message: "Invalid parameter" });
			break;
		}
	}
	successResponse({ res, message: "Updated" });
};

const remove = async (req, res) => {
	if (!req.body.code_id) {
		failureResponse({
			res,
			message: "Missing 'code_id' parameter in the body"
		});
	}
	try {
		const snippets = await CodeSnippet.deleteOne({ _id: req.body.code_id });
		successResponse({ res, message: "Snipped was removed" });
	} catch {
		failureResponse({
			res,
			message: "There was a problem removing this snipped"
		});
	}
};

export { addCode, getUserSnippets, updateSnippet, remove };
