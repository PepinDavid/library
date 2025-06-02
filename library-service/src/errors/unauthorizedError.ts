export class UnauthorizedError extends Error {
    status: number;

    constructor(message: unknown) {
        super(JSON.stringify(message));
        this.status = 401;
        this.name = "UnauthorizedError"
    }
}