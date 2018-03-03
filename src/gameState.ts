import { Bit } from "./bit";

export enum Turn {
    Referee,
    WaitingForPlayers,
    WaitingForAlice,
    WaitingForBob
}

export class GameState {
    private turn: Turn = Turn.Referee;

    private lastInputAlice: Bit = new Bit();

    private lastInputBob: Bit = new Bit();

    private refereeQuestionAlice: Bit = new Bit();

    private refereeQuestionBob: Bit = new Bit();

    isRefereesTurn() {
        return this.turn === Turn.Referee;
    }

    isAlicesTurn() {
        return this.turn === Turn.WaitingForAlice || this.turn === Turn.WaitingForPlayers;
    }

    isBobsTurn() {
        return this.turn === Turn.WaitingForBob || this.turn === Turn.WaitingForPlayers;
    }

    inputAlice(input: Bit) {
        if (!this.isAlicesTurn()) return;
        this.lastInputAlice = input;
        if (this.turn === Turn.WaitingForAlice) {
            this.turn = Turn.Referee;
        } else {
            this.turn = Turn.WaitingForBob;
        }
    }

    inputBob(input: Bit) {
        if (!this.isBobsTurn()) return;
        this.lastInputBob = input;
        if (this.turn === Turn.WaitingForBob) {
            this.turn = Turn.Referee;
        } else {
            this.turn = Turn.WaitingForAlice;
        }
    }

    referee(questionAlice: Bit, questionBob: Bit) {
        if (this.turn !== Turn.Referee) return;
        this.refereeQuestionAlice = questionAlice;
        this.refereeQuestionBob = questionBob;
        this.turn = Turn.WaitingForPlayers;
    }

    score() {
        return this.winning() ? 1 : 0;
    }

    private winning() {
        const refereeProduct = this.refereeQuestionAlice.toNumber() * this.refereeQuestionBob.toNumber();
        return (this.lastInputAlice.toNumber() && this.lastInputBob.toNumber()) ?
            refereeProduct === 0:
            refereeProduct === this.lastInputAlice.toNumber() || this.lastInputBob.toNumber();
    }
}