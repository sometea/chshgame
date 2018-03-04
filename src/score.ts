import { Bit } from "./bit";

export class Score {
    getScore(questionAlice: Bit, questionBob: Bit, answerAlice:Bit, answerBob: Bit): 0 | 1 {
        return this.winning(questionAlice, questionBob, answerAlice, answerBob) ? 1 : 0;
    }

    private winning(questionAlice: Bit, questionBob: Bit, answerAlice: Bit, answerBob: Bit) {
        const refereeProduct = questionAlice.toNumber() * questionBob.toNumber();
        return (answerAlice.toNumber() && answerBob.toNumber()) ?
            refereeProduct === 0:
            refereeProduct === answerAlice.toNumber() || answerBob.toNumber();
    }
}