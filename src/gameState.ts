import { Bit } from "./bit";
import { Round } from "./round";
import { PlayerName } from "./player";

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

    isPlayersTurn(player: PlayerName) {
        return this.turn === Turn.WaitingForPlayers || this.waitingForPlayer(player);
    }

    waitingForPlayer(player: PlayerName) {
        return (player === PlayerName.Alice && this.turn === Turn.WaitingForAlice) ||
            (player === PlayerName.Bob && this.turn === Turn.WaitingForBob);
    }

    playerInput(input: Bit, player: PlayerName) {
        if (!this.isPlayersTurn(player)) return;
        this.round.answer[player] = input;
        this.updateTurnPlayerFinished(player);
    }

    private updateTurnPlayerFinished(player: PlayerName) {
        if (this.waitingForPlayer(player)) {
            this.turn = Turn.Referee;
        } else {
            this.turn = player === PlayerName.Alice ? Turn.WaitingForBob : Turn.WaitingForAlice;
        }
    }

    referee(questionAlice: Bit, questionBob: Bit) {
        if (this.turn !== Turn.Referee) return;
        this.round.question[PlayerName.Alice] = questionAlice;
        this.round.question[PlayerName.Bob] = questionBob;
        this.turn = Turn.WaitingForPlayers;
    }

    getScore() {
        return this.round.getScore();
    }
}