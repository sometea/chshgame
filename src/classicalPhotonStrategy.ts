import { GameStrategy } from "./gameStrategy";
import { Bit } from "./bit";
import { Socket } from "net";

export class ClassicalPhotonStrategy implements GameStrategy {
    constructor(private connection: Socket) { }

    answer(question: Bit): Promise<Bit> {
        this.connection.write(question.toString() + '\n');
        return new Promise<Bit>((resolve, reject) => {
            this.connection.on('data', data => {
                if (data.toString().includes('Result:')) {
                    resolve((new Bit()).fromString(data.toString().substr(-1)));
                }
            })
        });
    }
}