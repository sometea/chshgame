import { GameState } from "./gameState";
import { Bit } from "./bit";
import { Summary } from "./summary";
import { Player } from "./player";

export class ChshGame {
    private state: GameState;

    private summary: Summary;
    
    private totalScore = 0;

    private turns = 0;
    
    constructor(private playerAlice: Player, private playerBob: Player) {
        this.state = new GameState();
        this.summary = new Summary();
    }

    private input(input: string, player: Player) {
        if(!this.state.isPlayersTurn(player.getPlayerName())) {
            player.message('It\'s not your turn, please wait.');
            return;
        }
        if (!this.checkInput(input)) {
            player.message('This is not valid input. Please answer with 0 or 1.');
            return;
        }
        this.state.playerInput((new Bit()).fromString(input), player.getPlayerName());
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
        this.messageBoth(this.summary.getSummary(this.state.getRound()));
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
            this.input(input, this.playerAlice);
        });
        this.playerBob.registerInputHandler(input => {
            this.input(input, this.playerBob);
        });
    }
}