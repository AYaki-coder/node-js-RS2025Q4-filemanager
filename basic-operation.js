import path from "node:path";
import { validateArgs } from "./utils.js";
import { InvalidInput } from "./invalid-input.js";
import { writeFile, rm, mkdir, rename, stat } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

export class BasicOperation {
    canHandle(command) {
        this.commandList = ["cat", "add", "mkdir", "rn", "cp", "mv", "rm"];
        return this.commandList.find((x) => x === command);
    }

    async handle(command, args) {
        switch (command) {
            case "cat":
                await this.handleCommand(1, args, this.readFile);
                break;

            case "add":
                await this.handleCommand(1, args, this.createFile);
                break;

            case "mkdir":
                await this.handleCommand(1, args, this.createDirectory);
                break;

            case "rn":
                await this.handleCommand(1, args, this.rename);
                break;

            case "cp":
                await this.handleCommand(2, args, this.copyFile);
                break;
            case "mv":
                await this.handleCommand(2, args, this.move);
                break;
            case "rm":
                await this.handleCommand(1, args, this.remove);
                break;

            default:
                throw new InvalidInput();
        }
    }

    async handleCommand(validArgsNumber, args, method) {
        validateArgs(args, validArgsNumber);
        const pathList = args.map((p) => path.resolve(process.cwd(), p));
        await method(pathList);
    }

    async createFile(pathList) {
        const [p] = pathList;
        await writeFile(p, "", { flag: "wx" });
    }

    async createDirectory(pathList) {
        const [p] = pathList;
        await mkdir(p, { recursive: true });
    }

    async remove(pathList) {
        const [p] = pathList;
        await rm(p);
    }

    async rename(pathList) {
        const [oldPath, newPath] = pathList;
        await rename(oldPath, newPath);
    }

    async readFile(pathList) {
        const [p] = pathList;

        const statistic = await stat(p);
        if (!statistic.isFile()) {
            throw new Error("not a file");
        }

        await new Promise((resolve, reject) => {
            const rs = createReadStream(p, { encoding: "utf-8" });
            rs.pipe(process.stdout);
            rs.on("end", () => resolve());
            rs.on("error", () => reject());
        });
    }

    async copyFile(pathList) {
        const [source, destination] = pathList;
        const fileName = path.parse(source).base;
        const newPath = path.resolve(destination, fileName);

        await pipeline(createReadStream(source), createWriteStream(newPath));
    }

    move = async (pathList) => {
        await this.copyFile(pathList);
        await this.remove(pathList);
    };
}
