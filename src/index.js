// eslint-disable-next-line import/no-unassigned-import
import './env';
import {Server as httpServer} from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { initializeSocket } from './socketio'
import './services/mongo';

const {PORT = 3000} = process.env;

const app = express();
const server = httpServer(app);
const io = socketio(server);


app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.disable('x-powered-by');

// Routes
app.use('/', routes);

// SocketIO
initializeSocket(io);

server.listen(PORT, () => {
	console.log(`> Listening on http://localhost:${PORT}`);
});
