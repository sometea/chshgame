import { Player, PlayerName } from "./player";
import { ChshGame } from "./chshGame";
import { GameState } from "./gameState";
import { Summary } from "./summary";
import { PlayerSocket } from "./playerSocket";
import { Socket, createConnection } from "net";
import { Experiment } from "./experiment";
import { ClassicalPhotons } from "./classicalPhotons";
import { QuantumPhotons } from "./quantumPhotons";
import { PhotonMeasuringStrategy } from "./photonMeasuringStrategy";

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
    GameStrategy: () => {
        return new PhotonMeasuringStrategy(createConnection(8001));
    },
    Experiment: (socketA: Socket, socketB: Socket) => {
        return new Experiment(socketA, socketB, container.ClassicalPhotons());
    },
    ClassicalPhotons: () => {
        return new ClassicalPhotons();
    },
    QuantumPhotons: () => {
        return new QuantumPhotons();
    },
};