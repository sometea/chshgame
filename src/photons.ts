import { createServer, Socket } from "net";
import { Experiment } from "./experiment";
import { container } from "./container";

let socketA: Socket;
let socketB: Socket;

let experiment: Experiment;

const server = createServer(socket => {
    socket.write('Sending out photons...\n');
    if (!socketA) {
        socketA = socket;
        return;
    } 
    if (!socketB) {
        socketB = socket;
        experiment = container.Experiment(socketA, socketB);
        experiment.start();
        return;
    }
    socket.write('There are already two participants in the two-photon experiment.\n');
    socket.destroy();
}).listen(8001);