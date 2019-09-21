const mapOfConnectedDevices = {}

export const initializeSocket = (socketio) => {
	socketio.on('connect', () => {
		console.log('connected');
	})

	socketio.on('connection', (io) => {
		console.log('connection stablished');


		io.joinRoom(io.query.sessionId)
		io.on('linkToSession', (data) => {// mobile wont listen, only emits
			io.emit('linkToSession', data)
		})

		io.on('type', () => {})
		io.on('disconnect', () => {
			console.log('disconnected');
		})
	})
}

{
	sessionId: 'web',
	email: '',
}