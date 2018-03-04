import { Bit } from "./bit";

export class Round {
    public answerAlice: Bit = new Bit();
    public answerBob: Bit = new Bit();
    public questionAlice: Bit = new Bit();
    public questionBob: Bit = new Bit();

    getScore(): 0 | 1 {
        return this.winning() ? 1 : 0;
    }

    private winning() {
        const refereeProduct = this.questionAlice.toNumber() * this.questionBob.toNumber();
        return (this.answerAlice.toNumber() && this.answerBob.toNumber()) ?
            refereeProduct === 0:
            refereeProduct === this.answerAlice.toNumber() || this.answerBob.toNumber();
    }
}
