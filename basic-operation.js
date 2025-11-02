export class BasicOperation {
    constructor() {
        this.commandList = ["cat", "add", "mkdir", "rn", "cp", "mv", "rm"];
    }

    canHandle(command) {
        return this.commandList.find((x) => x === command);
    }

    handle(command) {
        console.log(`Module BasicOperation received: ${command}`);
    }
}
