import { SharedPhotons } from "./sharedPhotons";
import { Bit } from "./bit";

export class ClassicalPhotons implements SharedPhotons {
    measure(setting1: Bit, setting2: Bit): [Bit, Bit] {
        const bitZero = (new Bit()).fromNumber(0);
        const bitOne = (new Bit()).fromNumber(1);

        return Math.random() < 0.5 ? [bitZero, bitOne] : [bitOne, bitZero];
    }
}