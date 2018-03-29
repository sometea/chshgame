import { Bit } from "./bit";

export interface SharedPhotons {
    measure(setting1: Bit, setting2: Bit): [Bit, Bit];
}