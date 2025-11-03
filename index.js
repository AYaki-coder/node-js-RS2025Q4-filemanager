import { createInterface } from "node:readline/promises";
import { Controller } from "./controller.js";
import { InvalidInput } from "./invalid-input.js";

try {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const controller = new Controller(rl);

    rl.on("line", async (x) => {
        try {
            await controller.handleLine(x);
        } catch (error) {
            if (error instanceof InvalidInput) {
                console.log(error.message);
            } else {
                console.log(error);
                console.log("Operation failed \n");
            }

            controller.printWorkingDir();
        }
    });
    rl.on("close", controller.sayGoodBye);
} catch (error) {
    console.error(error);
}
