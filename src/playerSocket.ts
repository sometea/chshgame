import { Socket } from "net";
import { Player } from "./player";

export class PlayerSocket implements Player {
    constructor(private socket: Socket) {}

    message(message: string) {
        this.socket.write(message + '\n');
    }

    registerInputHandler(handler: (input: string) => void) {
        this.socket.on('data', (data: Buffer) => {
            handler(data.toString().trimRight());
        });
    }
}