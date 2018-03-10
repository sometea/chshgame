import { Round } from "./round";

export class Summary {
    getSummary(round: Round): string {
        return 'Question to Alice: ' + round.questionAlice.toString() + '\n'
            + 'Question to Bob: ' + round.questionBob.toString() + '\n'
            + 'Alice answered: ' + round.answerAlice.toString() + '\n'
            + 'Bob answered: ' + round.answerBob.toString();
    }
}