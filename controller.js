import { BasicOperation } from "./basic-operation.js";
import { Brotli } from "./brotli.js";
import { ARG_NAME, SEPARATOR } from "./constants.js";
import os from "node:os";
import { Hash } from "./hash.js";
import { OperatingSystemInfo } from "./operating-system-info.js";
import { Navigation } from "./navigation.js";

export class Controller {
    constructor(rl) {
        this.handlerList = [new BasicOperation(), new Brotli(), new Hash(), new Navigation(), new OperatingSystemInfo()];
        this.rl = rl;
        this.username = this.getUserName();
        this.sayHello();
        this.printWorkingDir();
    }

    getUserName() {
        const args = process.argv.slice(2);
        const usernameValue = args.find((x) => x.startsWith(ARG_NAME + SEPARATOR))?.slice((ARG_NAME + SEPARATOR).length);
        return usernameValue ? usernameValue : "Anonymous";
    }

    sayHello() {
        console.log(`Welcome to the File Manager, ${this.username}!`);
    }

    sayGoodBye = () => {
        console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    };

    printWorkingDir() {
        console.log(`You are currently in ${os.homedir()} \n`);
    }

    handleLine(line) {
        if (line === ".exit") {
            this.rl.close();
        }
        const handler = this.handlerList.find((x) => x.canHandle(line));

        if (!handler) {
            console.log("Invalid input \n");
        } else {
            handler.handle(line);
        }

        this.printWorkingDir();
    }
}
