import { Bit } from "./bit";
import { Score } from "./score";

export enum Turn {
    Referee,
    WaitingForPlayers,
    WaitingForAlice,
    WaitingForBob
}

export class Round {
    public lastInputAlice: Bit = new Bit();
    public lastInputBob: Bit = new Bit();
    public refereeQuestionAlice: Bit = new Bit();
    public refereeQuestionBob: Bit = new Bit();
}

export class GameState {
    private turn: Turn = Turn.Referee;
    private round: Round = new Round();
    private score: Score = new Score();

    getRound() {
        return this.round;
    }

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
        this.round.lastInputAlice = input;
        if (this.turn === Turn.WaitingForAlice) {
            this.turn = Turn.Referee;
        } else {
            this.turn = Turn.WaitingForBob;
        }
    }

    inputBob(input: Bit) {
        if (!this.isBobsTurn()) return;
        this.round.lastInputBob = input;
        if (this.turn === Turn.WaitingForBob) {
            this.turn = Turn.Referee;
        } else {
            this.turn = Turn.WaitingForAlice;
        }
    }

    referee(questionAlice: Bit, questionBob: Bit) {
        if (this.turn !== Turn.Referee) return;
        this.round.refereeQuestionAlice = questionAlice;
        this.round.refereeQuestionBob = questionBob;
        this.turn = Turn.WaitingForPlayers;
    }

    getScore() {
        return this.score.getScore(this.round);
    }
}