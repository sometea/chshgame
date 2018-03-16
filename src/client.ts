import { createConnection, Socket } from "net";

const connection = createConnection(8000);

let counter = 0;
const maxCounter = 1000;

connection.on('data', data => {
    if (data.toString().includes('Referee question') && counter < maxCounter) {
        connection.write('0\n');
        counter++;
    }
    console.log(data.toString());
});
