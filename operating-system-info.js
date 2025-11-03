import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import { validateArgs } from "./utils.js";
import { InvalidInput } from "./invalid-input.js";

export class OperatingSystemInfo {
    canHandle(command) {
        return command === "os";
    }

    handle(_, args) {
        validateArgs(args, 1);

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
                throw new InvalidInput();
        }
    }
}
