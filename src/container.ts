import { Player, PlayerName } from "./player";
import { ChshGame } from "./chshGame";
import { GameState } from "./gameState";
import { Summary } from "./summary";
import { PlayerSocket } from "./playerSocket";
import { Socket } from "net";

export const container = {
    ChshGame: (playerAlice: Player, playerBob: Player) => {
        return new ChshGame(playerAlice, playerBob, container.GameState(), container.Summary());
    },
    GameState: () => {
        return new GameState();
    },
    Summary: () => {
        return new Summary();
    },
    PlayerAlice: (socket: Socket) => {
        return new PlayerSocket(socket, PlayerName.Alice);
    },
    PlayerBob: (socket: Socket) => {
        return new PlayerSocket(socket, PlayerName.Bob);
    },
};