import "./env";
import { Server as httpServer } from "http";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import "./services/mongo";
import io from 'socket.io'

const { PORT = 3000 } = process.env;

const app = express();
const server = httpServer(app);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable("x-powered-by");

// Routes
app.use("/", routes);

server.listen(PORT, () => {
	console.log(`> Listening on http://localhost:${PORT}`);
});
