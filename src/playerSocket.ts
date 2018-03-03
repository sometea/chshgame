import { Socket } from "net";

export class PlayerSocket {
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