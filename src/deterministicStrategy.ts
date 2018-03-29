import { GameStrategy } from "./gameStrategy";
import { Bit } from "./bit";

export class DeterministicStrategy implements GameStrategy {
    answer(question: Bit): Bit {
        return (new Bit()).fromNumber(0);
    }
}