import { createServer, Socket } from 'net';
import { ChshGame } from './chshGame';
import { Player, PlayerName } from './player';
import { PlayerSocket } from './playerSocket';

let playerAlice: Player;
let playerBob: Player;
let game: ChshGame;

const server = createServer(socket => {
    socket.write('Welcome to the CHSH game!\n');
    if (!playerAlice) {
        playerAlice = new PlayerSocket(socket, PlayerName.Alice);
        playerAlice.message('You are Alice! Waiting for Bob to join...');
        return;
    }
    if (!playerBob) {
        playerBob = new PlayerSocket(socket, PlayerName.Bob);
        playerBob.message('You are Bob! Alright, Alice has already joined, so starting the Game now!');
        playerAlice.message('Bob has just joined. Starting the game now, have fun!')
        game = new ChshGame(playerAlice, playerBob);
        game.start();
        return;
    }
    socket.write('Unfortunately, there are already two players. Bye!\n')
    socket.destroy();
}).listen(8000);
