import { GameStrategy } from "./gameStrategy";
import { Bit } from "./bit";
import { Socket } from "net";

export class ClassicalPhotonStrategy implements GameStrategy {
    constructor(private connection: Socket) { }

    answer(question: Bit): Promise<Bit> {
        this.connection.write(question.toString() + '\n');
        return Promise.resolve(new Bit());
    }
}