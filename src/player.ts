export interface Player {
    message(message: string): void;
    registerInputHandler(handler: (input: string) => void): void;
}