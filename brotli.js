export class Brotli {
    constructor() {
        this.commandList = ["compress", "decompress"];
    }

    canHandle(command) {
        return this.commandList.find((x) => x === command);
    }

    handle(command) {
        console.log(`Module Brotli received: ${command}`);
    }
}
