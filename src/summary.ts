import { Round } from "./gameState";

export class Summary {
    getSummary(round: Round): string {
        return 'Question to Alice: ' + round.refereeQuestionAlice.toString() + '\n'
            + 'Question to Bob: ' + round.refereeQuestionBob.toString() + '\n'
            + 'Alice answered: ' + round.lastInputAlice.toString() + '\n'
            + 'Bob answered: ' + round.lastInputBob.toString();
    }
}