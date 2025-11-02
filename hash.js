import { validateArgs } from "./utils.js";
import { createHash } from "node:crypto";
import path from "node:path";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";

export class Hash {
    canHandle(command) {
        return command === "hash";
    }

    async handle(_, args) {
        validateArgs(args, 1);
        const [p] = args.map((p) => path.resolve(process.cwd(), p));

        const statistic = await stat(p);
        if (!statistic.isFile()) {
            throw new Error("not a file");
        }

        const hash = createHash("sha256");

        await new Promise((resolve, reject) => {
            const rs = createReadStream(p, { encoding: "utf-8" });
            rs.pipe(hash)
                .on("finish", () => {
                    console.log(`hash: ${hash.digest("hex")}`);
                    resolve();
                })
                .on("error", () => reject());
        });
    }
}
