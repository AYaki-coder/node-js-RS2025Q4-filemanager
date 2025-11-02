export class OperatingSystemInfo {
    constructor() {
        this.commandList = [];
    }

    canHandle(command) {
        return command === "os";
    }

    handle(command) {
        console.log(`Module OperatingSystemInfo received: ${command}`);
    }
}
