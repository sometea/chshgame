import { Bit } from "./bit";

export interface GameStrategy {
    answer(question: Bit): Bit;
}