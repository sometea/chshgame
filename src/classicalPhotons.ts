import { SharedPhotons } from "./sharedPhotons";
import { Bit } from "./bit";

export class ClassicalPhotons implements SharedPhotons {
    measure(setting1: Bit, setting2: Bit): [Bit, Bit] {
        const bitZero = new Bit(0);
        const bitOne = new Bit(1);
        let output1: Bit;
        let output2: Bit;
        [output1, output2] = Math.random() < 0.5 ? [bitZero, bitOne] : [bitOne, bitZero];

        if (!setting1.toBoolean()) {
            output1 = new Bit(0);
        }

        if (!setting2.toBoolean()) {
            output2 = new Bit(0);
        }

        return [output1, output2];
    }
}