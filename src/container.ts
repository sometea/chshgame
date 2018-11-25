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
    ChshGame: (playerAlice: Player, playerBob: Player) => new ChshGame(playerAlice, playerBob, container.GameState(), container.Summary()),
    GameState: () => new GameState(),
    Summary: () => new Summary(),
    PlayerAlice: (socket: Socket) => new PlayerSocket(socket, PlayerName.Alice),
    PlayerBob: (socket: Socket) => new PlayerSocket(socket, PlayerName.Bob),
    GameStrategy: () => new PhotonMeasuringStrategy(createConnection(8001)),
    Experiment: (socketA: Socket, socketB: Socket) => new Experiment(socketA, socketB, container.ClassicalPhotons()),
    ClassicalPhotons: () => new ClassicalPhotons(),
    QuantumPhotons: () => new QuantumPhotons(),
};