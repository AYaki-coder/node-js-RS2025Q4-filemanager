import { InvalidInput } from "./invalid-input.js";

export function validateArgs(args, number) {
    if (args.length !== number) {
        throw new InvalidInput();
    }
}
