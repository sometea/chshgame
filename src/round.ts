import { Bit } from "./bit";
import { PlayerName } from "./player";

export class Round {
    public answer = {
        [PlayerName.Alice]: new Bit(),
        [PlayerName.Bob]: new Bit(),
    };

    public question = {
        [PlayerName.Alice]: new Bit(),
        [PlayerName.Bob]: new Bit(),
    }

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
        const refereeProduct = (this.question[PlayerName.Alice].toNumber() * this.question[PlayerName.Bob].toNumber() === 1);
        const answerXor = this.xor(this.answer[PlayerName.Alice].toBoolean(), this.answer[PlayerName.Bob].toBoolean());
        return refereeProduct === answerXor;
    }
}
