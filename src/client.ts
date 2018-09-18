import { createConnection, Socket } from "net";
import { GameStrategy } from "./gameStrategy";
import { DeterministicStrategy } from "./deterministicStrategy";
import { Bit } from "./bit";
import { PhotonMeasuringStrategy } from "./photonMeasuringStrategy";

const gameConnection = createConnection(8000);

let counter = 0;
const maxCounter = 500;

// const strategy: GameStrategy = new DeterministicStrategy();
const strategy: GameStrategy = new PhotonMeasuringStrategy(createConnection(8001));

gameConnection.on('data', async data => {
    if (data.toString().includes('Referee question') && counter < maxCounter) {
        const question = (new Bit()).fromString(data.toString().substr(-2, 1));
        const answer = await strategy.answer(question);
        gameConnection.write(answer.toString());
        counter++;
    }
    console.log(data.toString());
});
