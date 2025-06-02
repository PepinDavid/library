export class InternalServerError extends Error {
    status: number;
    name: string;

    constructor(message: unknown) {
        super(message as string);
        this.status = 500;
        this.name = 'InternalServerError'
    }
}