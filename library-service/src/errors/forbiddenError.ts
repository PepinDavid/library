export class ForbiddenError extends Error {
    status: number;

    constructor(message: unknown) {
        super(JSON.stringify(message));
        this.status = 403;
        this.name = 'ForbiddenError'
    }
}