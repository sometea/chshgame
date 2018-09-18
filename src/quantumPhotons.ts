import { SharedPhotons } from "./sharedPhotons";
import { Bit } from "./bit";

export class QuantumPhotons implements SharedPhotons {
    measure(setting1: Bit, setting2: Bit): [Bit, Bit] {
        const randomNumber: number = Math.random();
        const possibleOutcomes = [[0, 0], [1, 0], [0, 1], [1, 1]];
        let probabilityOfOutcome = 0;
        for (let outcome of possibleOutcomes) {
            probabilityOfOutcome += this.probability(
                outcome[0],
                outcome[1],
                setting1.toNumber(),
                setting2.toNumber()
            );
            if (randomNumber < probabilityOfOutcome) {
                return [new Bit(outcome[0]), new Bit(outcome[1])];
            }
        }
        return [new Bit(possibleOutcomes[1][0]), new Bit(possibleOutcomes[1][1])];
    }

    private probability(
        outcome1: number,
        outcome2: number,
        setting1: number,
        setting2: number
    ): number {
        const angle = (setting1 === setting2) ? - 3.0 * Math.PI / 4.0 : -1.0 * Math.PI / 4.0;
        return outcome1 === outcome2 ? (1 - Math.cos(angle)) / 4.0 : (1 + Math.cos(angle)) / 4.0;
    }
}