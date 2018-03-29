export class ExperimentInput {
    private input: string = '';
    private provided: boolean = false;

    provide(input: string) {
        if (!this.provided) {
            this.input = input;
            this.provided = true;
        }
    }

    wasProvided(): boolean {
        return this.provided;
    }
}