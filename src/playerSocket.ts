import { Socket } from "net";

export class PlayerSocket {
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