import { createInterface } from "node:readline/promises";
import { Controller } from "./controller.js";

try {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const controller = new Controller(rl);

    rl.on("line", (x) => controller.handleLine(x));
    rl.on("close", controller.sayGoodBye);
} catch (error) {
    console.error(error);
}
