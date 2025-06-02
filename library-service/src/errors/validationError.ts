export class ValidationError extends Error {
    status: number;

    constructor(message: unknown) {
        super(JSON.stringify(message));
        this.status = 400;
        this.name = 'ValidationError'
    }
}