import { Socket } from "net";
import { ExperimentInput } from "./experimentInput";
import { SharedPhotons } from "./sharedPhotons";
import { ClassicalPhotons } from "./classicalPhotons";
import { Bit } from "./bit";
import { QuantumPhotons } from "./quantumPhotons";

export class Experiment {
    private lastInputA = new ExperimentInput();
    private lastInputB = new ExperimentInput();
    
    private sharedPhotons: SharedPhotons;

    constructor(private socketA: Socket, private socketB: Socket) { 
        // this.sharedPhotons = new ClassicalPhotons();
        this.sharedPhotons = new QuantumPhotons();
    }

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
        const results = this.sharedPhotons.measure(
            (new Bit()).fromString(this.lastInputA.get()),
            (new Bit()).fromString(this.lastInputB.get())
        );
        this.socketA.write('Result: ' + results[0].toString() + '\n');
        this.socketB.write('Result: ' + results[1].toString() + '\n');
    }
}