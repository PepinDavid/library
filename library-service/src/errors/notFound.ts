export class NotFoundError extends Error {
    status: number;
    msg: string

    constructor(message: unknown) {
        super(JSON.stringify(message));
        this.msg = JSON.stringify(message);
        this.status = 404;
        this.name = 'NotFound'
    }
}