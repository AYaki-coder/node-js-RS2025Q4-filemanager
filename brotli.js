import path from "node:path";
import { validateArgs } from "./utils.js";
import { stat } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

export class Brotli {
    canHandle(command) {
        this.commandList = ["compress", "decompress"];
        return this.commandList.find((x) => x === command);
    }

    async handle(command, args) {
        validateArgs(args, 2);
        const pathList = args.map((p) => path.resolve(process.cwd(), p));
        const [source, destination] = pathList;

        const statistic = await stat(source);
        if (!statistic.isFile()) {
            throw new Error("not a file");
        }

        const br = command === "compress" ? createBrotliCompress() : createBrotliDecompress();

        await pipeline(createReadStream(source), br, createWriteStream(destination));
    }
}
