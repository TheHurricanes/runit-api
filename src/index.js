import './env';
import {Server as httpServer} from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import socket from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import './services/mongo';

const app = express();
const server = httpServer(app);
const io = socket(server);

app.use((req, res, next) => {
	req.io = io;
	next();
});

const {PORT = 3000} = process.env;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.disable('x-powered-by');

io.on('connection', () => {
	console.log('Connected');
});

app.use('/', routes);

server.listen(PORT, () => {
	console.log(`> Listening on http://localhost:${PORT}`);
});
