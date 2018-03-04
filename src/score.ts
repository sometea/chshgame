import { Bit } from "./bit";
import { Round } from "./gameState";

export class Score {
    getScore(round: Round): 0 | 1 {
        return this.winning(round) ? 1 : 0;
    }

    private winning(round: Round) {
        const refereeProduct = round.refereeQuestionAlice.toNumber() * round.refereeQuestionBob.toNumber();
        return (round.lastInputAlice.toNumber() && round.lastInputBob.toNumber()) ?
            refereeProduct === 0:
            refereeProduct === round.lastInputAlice.toNumber() || round.lastInputBob.toNumber();
    }
}