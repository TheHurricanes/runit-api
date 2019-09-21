import { successResponse, failureResponse } from '../utils/http-responses';
import CodeSnippet from '../models/code.model'

const addCode = async (req, res) => {
	const snippet = {
		content: req.body.content,
		language: req.body.language,
		owner_id: req.body.owner_id
	};

	if (!req.body.content) {
		failureResponse({ res, message: "Missing 'content' parameter in the body" });
	}

	if (!req.body.language) {
		failureResponse({ res, message: "Missing 'language' parameter in the body" });
	}

	if (!req.body.owner_id) {
		failureResponse({ res, message: "Missing 'owner_id' parameter in the body" });
	}

	await CodeSnippet.create(snippet);
	successResponse({res, data: snippet });
};

const getUserSnippets = async (req, res) => {

	if (!req.body.owner_id) {
		failureResponse({ res, message: "Missing 'owner_id' parameter in the body" });
	}
	const snippets = await CodeSnippet.find( { owner_id: req.body.owner_id } );
	successResponse({res, data: snippets });
}

const updateSnippet = async (req, res) => {

	if (!req.body.new_content) {
		failureResponse({ res, message: "Missing 'new_content' parameter in the body" });
	}
	if (!req.body.code_id) {
		failureResponse({ res, message: "Missing 'code_id' parameter in the body" });
	}

	await CodeSnippet.updateOne({'_id':req.body.code_id},{$set:{'content':req.body.new_content}})
	successResponse({res});
}

export {addCode, getUserSnippets, updateSnippet};
