export class ParamsNotFound extends Error {
    status: number;

    constructor(message: unknown) {
        super(JSON.stringify(message));
        this.status = 204;
        this.name = 'ParamsNotFound';
    }
}