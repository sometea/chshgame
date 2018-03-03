import { PlayerSocket } from "./playerSocket";

export class ChshGame {
    constructor(private playerAlice: PlayerSocket, private playerBob: PlayerSocket) {}

    private inputAlice(input: string) {
        this.playerBob.message('Alice said: ' + input);
    }

    private inputBob(input: string) {
        this.playerAlice.message('Bob said: ' + input);
    }

    start() {
        this.playerAlice.registerInputHandler(input => {
            this.inputAlice(input);
        });
        this.playerBob.registerInputHandler(input => {
            this.inputBob(input);
        });
    }
}