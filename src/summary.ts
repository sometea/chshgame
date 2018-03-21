import { Round } from "./round";
import { PlayerName } from "./player";

export class Summary {
    getSummary(round: Round): string {
        return 'Question to Alice: ' + round.question[PlayerName.Alice].toString() + '\n'
            + 'Question to Bob: ' + round.question[PlayerName.Bob].toString() + '\n'
            + 'Alice answered: ' + round.answer[PlayerName.Alice].toString() + '\n'
            + 'Bob answered: ' + round.answer[PlayerName.Bob].toString();
    }
}