import { GameStrategy } from "./gameStrategy";
import { Bit } from "./bit";

export class DeterministicStrategy implements GameStrategy {
    answer(question: Bit): Promise<Bit> {
        return Promise.resolve((new Bit()).fromNumber(0));
    }
}