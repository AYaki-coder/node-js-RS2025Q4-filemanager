export class Hash {
    constructor() {
        this.commandList = [];
    }

    canHandle(command) {
        return command === "hash";
    }

    handle(command) {
        console.log(`Module Hash received: ${command}`);
    }
}
