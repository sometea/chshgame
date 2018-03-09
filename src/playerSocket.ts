import { Socket } from "net";
import { Player } from "./player";

export class PlayerSocket implements Player {
    constructor(private socket: Socket) {}

    message(message: string) {
        this.socket.write(message + '\n\n');
    }

    registerInputHandler(handler: (input: string) => void) {
        this.socket.on('data', (data: Buffer) => {
            this.socket.write('\n');
            handler(data.toString().trimRight());
        });
    }
}