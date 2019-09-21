import mongoose from "../services/mongo";

const UserSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: "Email address is required",
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address"
		]
	},
	avatar: String,
	password: String
});

export default mongoose.model("User", UserSchema, "users");
