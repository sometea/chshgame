# The CHSH game implemented in nodejs
## Requirements
After checking out this repo, run

> npm install

to install dependencies, then

> npm run build

to run the TypeScript transpiler.

## Running
> npm run start

will run the game. It is a server listening on port 8000. Connect to it using telnet. Only two participants can
connect, one is Alice, the other one is Bob.

> npm run photons

will run the photon experiment, as a separate server listening on port 8001. The two players can connect again
and choose one of two measurements, after which the server will send the outcome.

> npm run client

will run a client that automatically connects to port 8000 and plays the game using a given strategy. In case
it is a "photon-measuring" strategy, it will also connect to port 8001 to be able to perform the photon
experiment. Run two clients to have Alice and Bob play the game automatically and to compare different
strategies.
