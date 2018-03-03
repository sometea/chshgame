import { createServer, Socket } from 'net';
import { PlayerSocket } from './playerSocket';
import { ChshGame } from './chshGame';

let playerAlice: PlayerSocket;
let playerBob: PlayerSocket;
let game: ChshGame;

const server = createServer(socket => {
    socket.write('Welcome to the CHSH game!\n');
    if (!playerAlice) {
        playerAlice = new PlayerSocket(socket);
        playerAlice.message('You are Alice! Waiting for Bob to join...');
        return;
    }
    if (!playerBob) {
        playerBob = new PlayerSocket(socket);
        playerBob.message('You are Bob! Alright, Alice has already joined, so starting the Game now!');
        playerAlice.message('Bob has just joined. Starting the game now, have fun!')
        game = new ChshGame(playerAlice, playerBob);
        game.start();
        return;
    }
    socket.write('Unfortunately, there are already two players. Bye!\n')
    socket.destroy();
}).listen(8000);
