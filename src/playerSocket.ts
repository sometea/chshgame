import { Socket } from "net";
import { Player, PlayerName } from "./player";

export class PlayerSocket implements Player {
    constructor(private socket: Socket, private playerName: PlayerName) {}

    getPlayerName(): PlayerName {
        return this.playerName;
    }

    message(message: string) {
        this.socket.write(message + '\n');
    }

    registerInputHandler(handler: (input: string) => void) {
        this.socket.on('data', (data: Buffer) => {
            handler(data.toString().trimRight());
        });
    }
}