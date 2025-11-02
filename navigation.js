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

        switch (command) {
            case "up":
                this.up();
                break;

            case "cd":
                this.changeDir(args);
                break;

            case "ls":
                this.list();
                break;
        }
    }

    up() {
        const p = path.resolve(process.cwd(), "..");
        process.chdir(p);
    }

    changeDir(args) {
        if (args.length !== 1) {
            throw Error("invalid path!");
        }
        console.log("args", args);
        const p = path.resolve(process.cwd(), args.join());
        process.chdir(p);
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
