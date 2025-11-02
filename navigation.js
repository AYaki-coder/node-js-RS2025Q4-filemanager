export class Navigation {
    constructor() {
        this.commandList = ["up", "cd", "ls"];
    }

    canHandle(command) {
        return this.commandList.find((x) => x === command);
    }

    handle(command) {
        console.log(`Module Navigation received: ${command}`);
    }
}
