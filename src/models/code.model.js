import mongoose from "../services/mongo";

const CodeSchema = new mongoose.Schema({
	content: String,
	language: String,
	owner_id: String,
	title: String
});

export default mongoose.model("Code", CodeSchema, "codes");
