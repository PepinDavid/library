export interface IBookBorrowedEvent {
    type: string;
    data: {
        bookId: number;
        userId: number;
        borrowDate: string;
        returnDate?: string;
    };
}

export interface IRabbitMQOptions {
    host: string;
    port: number;
    username: string;
    password: string;
}

export type LibraryServiceEvent = IBookBorrowedEvent;
