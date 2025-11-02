import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export class OperatingSystemInfo {
    constructor() {
        this.commandList = [];
    }

    canHandle(command) {
        return command === "os";
    }

    handle(command, args) {
        console.log(`Module OperatingSystemInfo received:: command -- ${command} and args -- ${args}`);
        const errorMessage = "Invalid input";

        if (args.length != 1) {
            console.log(errorMessage);
        }

        const arg = args.join();

        switch (arg) {
            case "--EOL":
                console.log(JSON.stringify(EOL));
                break;

            case "--cpus":
                const data = cpus().map(({ model, speed: sp }) => ({ model, speed: `${sp * 0.001} GHz` }));
                console.log(`Total CPU's: ${data.length}\n`);
                console.table(data);

                break;
            case "--homedir":
                console.log(homedir());
                break;
            case "--username":
                console.log(userInfo().username);
                break;
            case "--architecture":
                console.log(arch());
                break;

            default:
                console.log(errorMessage);
                break;
        }
    }
}
