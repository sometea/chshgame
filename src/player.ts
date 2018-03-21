export enum PlayerName {
    Alice,
    Bob
}

export interface Player {
    message(message: string): void;
    registerInputHandler(handler: (input: string) => void): void;
    getPlayerName() : PlayerName;
}