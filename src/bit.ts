export class Bit {
    private bit: 0 | 1 = 0;

    constructor() {
        this.fromRandom();
    }

    fromString(s: string) {
        this.bit = s === '0' ? 0 : 1;
        return this;
    }

    toNumber() {
        return this.bit;
    }

    toBoolean(): boolean {
        return this.bit === 1;
    }

    toString() {
        return this.toNumber().toString();
    }

    fromNumber(n: Number) {
        this.bit = n < 0.5 ? 0 : 1;
        return this;
    }

    fromRandom() {
        return this.fromNumber(Math.random());
    }
}