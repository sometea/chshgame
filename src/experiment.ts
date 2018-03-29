import { Socket } from "net";
import { ExperimentInput } from "./experimentInput";

export class Experiment {
    private lastInputA = new ExperimentInput();
    private lastInputB = new ExperimentInput();

    constructor(private socketA: Socket, private socketB: Socket) { }

    start() {
        this.socketA.on('data', (data: Buffer) => {
            this.lastInputA.provide(data.toString() === '1' ? '1' : '0');
            this.checkAndContinue();
        });
        this.socketB.on('data', (data: Buffer) => {
            this.lastInputB.provide(data.toString() === '1' ? '1' : '0');
            this.checkAndContinue();
        });
    }

    private checkAndContinue() {
        if (this.lastInputA.wasProvided() && this.lastInputB.wasProvided()) {
            this.outputValues();
            this.lastInputA = new ExperimentInput();
            this.lastInputB = new ExperimentInput();
        }
    }

    private outputValues() {
        this.socketA.write('0\n');
        this.socketB.write('0\n');
    }
}