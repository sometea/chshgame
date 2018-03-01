import { createServer } from 'net';

const server = createServer(socket => {
    socket.write('Welcome to the CHSH game!');
}).listen(8000);