import { PlayerSocket } from "./playerSocket";
import { GameState } from "./gameState";
import { Bit } from "./bit";
import { Summary } from "./summary";

export class ChshGame {
    private state: GameState;
    
    private totalScore = 0;

    private turns = 0;
    
    constructor(private playerAlice: PlayerSocket, private playerBob: PlayerSocket) {
        this.state = new GameState();
    }
    
    private inputAlice(input: string) {
        if (!this.state.isAlicesTurn()) {
            this.playerAlice.message('It\'s not your turn, please wait.');
            return;
        }
        if (!this.checkInput(input)) {
            this.playerAlice.message('This is not valid input. Please answer with 0 or 1.');
            return;
        }
        this.state.inputAlice((new Bit()).fromString(input));
        this.triggerReferee();
    }
    
    private inputBob(input: string) {
        if (!this.state.isBobsTurn()) {
            this.playerBob.message('It\'s not your turn, please wait.');
            return;
        }
        if (!this.checkInput(input)) {
            this.playerBob.message('This is not valid input. Please answer with 0 or 1.');
            return;
        }
        this.state.inputBob((new Bit()).fromString(input));
        this.triggerReferee();
    }
    
    private messageBoth(message: string) {
        this.playerAlice.message(message);
        this.playerBob.message(message);
    }

    private triggerReferee() {
        if (!this.state.isRefereesTurn()) return;
        this.totalScore += this.state.getScore();
        this.turns += 1;
        this.messageBoth((new Summary()).getSummary(this.state.getRound()));
        this.messageBoth('You ' + (this.state.getScore() ? 'win' : 'loose') + ', % won: ' + this.totalScore / this.turns * 100 + '\n');
        this.poseRefereeQuestion();
    }
    
    private poseRefereeQuestion() {
        const questionAlice: Bit = new Bit();
        const questionBob: Bit = new Bit();
        this.playerAlice.message('Referee question: ' + questionAlice.toString());
        this.playerBob.message('Referee question: ' + questionBob.toString());
        this.state.referee(questionAlice, questionBob);
    }

    private checkInput(input: string) {
        return input === '0' || input === '1';
    }

    start() {
        this.poseRefereeQuestion();
        this.playerAlice.registerInputHandler(input => {
            this.inputAlice(input);
        });
        this.playerBob.registerInputHandler(input => {
            this.inputBob(input);
        });
    }
}