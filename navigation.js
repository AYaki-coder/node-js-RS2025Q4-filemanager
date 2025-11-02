import path from "node:path";
import { readdir } from "node:fs/promises";
import { InvalidInput } from "./invalid-input.js";
import { validateArgs } from "./utils.js";

export class Navigation {
    canHandle(command) {
        this.commandList = ["up", "cd", "ls"];
        return this.commandList.find((x) => x === command);
    }

    handle(command, args) {
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

            default:
                throw new InvalidInput();
        }
    }

    up() {
        const p = path.resolve(process.cwd(), "..");
        process.chdir(p);
    }

    changeDir(args) {
        validateArgs(args, 1);
        try {
            const p = path.resolve(process.cwd(), args.join());
            process.chdir(p);
        } catch {
            throw new InvalidInput();
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
