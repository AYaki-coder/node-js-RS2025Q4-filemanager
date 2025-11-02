const { createInterface } = require("node:readline/promises");

const argName = "--username";
const separator = "=";

try {
    const args = process.argv.slice(2);
    const usernameValue = args.find((x) => x.startsWith(argName + separator))?.slice((argName + separator).length);
    const username = usernameValue ? usernameValue : "Anonymous";
    console.log(`Welcome to the File Manager, ${username}!`);

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on("line", (line) => {
        console.log(`Received: ${line}`);
        if (line === ".exit") {
            rl.close();
        }
    });

    rl.on("close", () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    });
} catch (error) {
    console.error(error);
}
