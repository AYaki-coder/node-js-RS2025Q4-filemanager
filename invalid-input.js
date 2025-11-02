export class InvalidInput extends Error {
    constructor(msg = "Invalid input") {
        super(msg);
    }
}
