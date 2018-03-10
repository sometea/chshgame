import { Bit } from "./bit";
import { Round } from "./round";

export enum Turn {
    Referee,
    WaitingForPlayers,
    WaitingForAlice,
    WaitingForBob
}

export class GameState {
    private turn: Turn = Turn.Referee;
    private round: Round = new Round();

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
        this.round.answerAlice = input;
        if (this.turn === Turn.WaitingForAlice) {
            this.turn = Turn.Referee;
        } else {
            this.turn = Turn.WaitingForBob;
        }
    }

    inputBob(input: Bit) {
        if (!this.isBobsTurn()) return;
        this.round.answerBob = input;
        if (this.turn === Turn.WaitingForBob) {
            this.turn = Turn.Referee;
        } else {
            this.turn = Turn.WaitingForAlice;
        }
    }

    referee(questionAlice: Bit, questionBob: Bit) {
        if (this.turn !== Turn.Referee) return;
        this.round.questionAlice = questionAlice;
        this.round.questionBob = questionBob;
        this.turn = Turn.WaitingForPlayers;
    }

    getScore() {
        return this.round.getScore();
    }
}