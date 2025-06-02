export interface IRead<T> {
    getAll(): Promise<T[] | null>;
    getOne(id: number | string): Promise<T | null>;
}

export interface IWrite<T, K> {
    create(data: Partial<K>): Promise<T>;
    update(id: number | string, data: Partial<K>): Promise<T>;
    delete(id: number | string): Promise<number>;
}

export interface IBaseService<T, K> extends IRead<T>, IWrite<T, K> {};

export type TServiceConstructor<TService, TArgs extends unknown[]> = new (...args: TArgs) => TService;

export interface IMessageBroker {
    publish<T extends object>(exchange: string, routingKey: string, message: T): Promise<void>;
    consume(
        queue: string,
        exchange: string,
        routingKey: string,
        handler: (msg: unknown) => void,
        exchangeType: 'topic' | 'direct' | 'fanout',
    ): Promise<void>;
}

export enum EServicesName {
    AuthService = "AuthService",
    AuthorBookService = "AuthorBookService",
    AuthorService = "AuthorService",
    BookService = "BookService",
    BorrowedBookService = "BorrowedBookService",
    GenreService = "GenreService",
    GenreBookService = "GenreBookService",
    UserService = "UserService",
    RabbitMQService = "RabbitMQService",
}
