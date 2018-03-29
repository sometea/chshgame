import { createConnection, Socket } from "net";
import { GameStrategy } from "./gameStrategy";
import { DeterministicStrategy } from "./deterministicStrategy";
import { Bit } from "./bit";

const connection = createConnection(8000);

let counter = 0;
const maxCounter = 500;

const strategy: GameStrategy = new DeterministicStrategy();

connection.on('data', data => {
    if (data.toString().includes('Referee question') && counter < maxCounter) {
        const question = (new Bit()).fromString(data.toString().substr(-1));
        connection.write(strategy.answer(question).toString());
        counter++;
    }
    console.log(data.toString());
});
