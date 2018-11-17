import { createServer } from 'net';
import { ChshGame } from './chshGame';
import { Player } from './player';
import { container } from './container';

let game: ChshGame;
let playerAlice: Player;
let playerBob: Player;

const server = createServer(socket => {
    socket.write('Welcome to the CHSH game!\n');
    if (!playerAlice) {
        playerAlice = container.PlayerAlice(socket);
        playerAlice.message('You are Alice! Waiting for Bob to join...');
        return;
    }
    if (!playerBob) {
        playerBob = container.PlayerBob(socket);
        playerBob.message('You are Bob! Alright, Alice has already joined, so starting the Game now!');
        playerAlice.message('Bob has just joined. Starting the game now, have fun!')
        game = container.ChshGame(playerAlice, playerBob);
        game.start();
        return;
    }
    socket.write('Unfortunately, there are already two players. Bye!\n')
    socket.destroy();
}).listen(8000);
