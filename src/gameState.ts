import { Bit } from "./bit";
import { Score } from "./score";

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

    private score: Score = new Score();

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

    getScore() {
        return this.score.getScore(
            this.refereeQuestionAlice,
            this.refereeQuestionBob,
            this.lastInputAlice,
            this.lastInputBob
        );
    }
}