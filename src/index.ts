import { createServer, Socket } from 'net';

let socketAlice: Socket, socketBob: Socket;

const server = createServer(socket => {
    socket.write('Welcome to the CHSH game!\n');
    if (!socketAlice) {
        socketAlice = socket;
        socket.write('You are Alice!\n');
        return;
    }
    if (!socketBob) {
        socketBob = socket;
        socket.write('You are Bob!\n');
        return;
    }
    socket.write('Unfortunately, there are already two players. Bye!\n')
    socket.destroy();
}).listen(8000);
