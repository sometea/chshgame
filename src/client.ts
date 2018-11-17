import { createConnection } from "net";
import { Bit } from "./bit";
import { container } from "./container";

const gameConnection = createConnection(8000);

let counter = 0;
const maxCounter = 500;

const strategy = container.GameStrategy();

gameConnection.on('data', async data => {
    if (data.toString().includes('Referee question') && counter < maxCounter) {
        const question = (new Bit()).fromString(data.toString().substr(-2, 1));
        const answer = await strategy.answer(question);
        gameConnection.write(answer.toString());
        counter++;
    }
    console.log(data.toString());
});
