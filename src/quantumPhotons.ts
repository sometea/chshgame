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
        const lambda1 = (outcome1 === 0) ? -1 : outcome1;
        const lambda2 = (outcome2 === 0) ? -1 : outcome2;
        const theta1 = (setting1 === 0) ? 0 : 2 * Math.PI / 4.0;
        const theta2 = (setting2 === 0) ? 3.0 * Math.PI / 4.0 : -3.0 * Math.PI / 4.0;
        return this.qmProbability(lambda1, lambda2, theta1, theta2);
    }

    private qmProbability(
        lambda1: number,
        lambda2: number,
        theta1: number,
        theta2: number
    ): number {
        return (4 - 4*lambda1*lambda2*2*Math.cos(theta1+theta2) + 4) / 32.0;
    }
}