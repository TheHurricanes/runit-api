import mongoose from "mongoose";

const { DB_SERVER, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_SERVER}/${DB_NAME}`;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
};

mongoose
	.connect(mongoUrl, options)
	.then(() => console.log("Connected to DB"))
	.catch(err => console.log("Not working", err.message));

export default mongoose;
