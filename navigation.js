import path from "node:path";
import { readdir } from "node:fs/promises";

export class Navigation {
    constructor() {
        this.commandList = ["up", "cd", "ls"];
    }

    canHandle(command) {
        return this.commandList.find((x) => x === command);
    }

    handle(command, args) {
        console.log(`Module Navigation received: command -- ${command} and args -- ${args}`);
        const errorMessage = "Invalid input";

        switch (command) {
            case "up":
                this.up();
                break;

            case "cd":
                this.changeDir(args, errorMessage);
                break;

            case "ls":
                this.list();
                break;

            default:
                console.log(errorMessage);
                break;
        }
    }

    up() {
        const p = path.resolve(process.cwd(), "..");
        process.chdir(p);
    }

    changeDir(args, message) {
        if (args.length !== 1) {
            console.log(message);
        }
        try {
            const p = path.resolve(process.cwd(), args.join());
            process.chdir(p);
        } catch {
            console.log(message);
        }
    }

    async list() {
        const dirContent = await readdir(process.cwd(), { withFileTypes: true });
        const sortedContent = [
            ...dirContent
                .filter((x) => x.isDirectory())
                .map((x) => ({ Name: x.name, Type: "directory" }))
                .sort((a, b) => a.Name.localeCompare(b.Name)),
            ...dirContent
                .filter((x) => x.isFile())
                .map((x) => ({ Name: x.name, Type: "file" }))
                .sort((a, b) => a.Name.localeCompare(b.Name)),
        ];
        console.table(sortedContent);
    }
}
