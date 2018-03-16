import { Bit } from "./bit";

export class Round {
    public answerAlice: Bit = new Bit();
    public answerBob: Bit = new Bit();
    public questionAlice: Bit = new Bit();
    public questionBob: Bit = new Bit();

    getScore(): 0 | 1 {
        return this.winning() ? 1 : 0;
    }

    private xor(a: boolean, b: boolean): boolean {
        if (a && b) {
            return false;
        }
        return a || b;
    }

    private winning() {
        const refereeProduct = (this.questionAlice.toNumber() * this.questionBob.toNumber() === 1);
        const answerXor = this.xor(this.answerAlice.toBoolean(), this.answerBob.toBoolean());
        return refereeProduct === answerXor;
    }
}
