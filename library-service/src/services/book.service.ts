import { InternalServerError } from "../errors/internalServerError";
import { IEventMessageBroker } from "../interfaces/message-broker.interface";
import { IMessageBroker } from "../interfaces/service.interface";
import { IBook } from "../models";
import { BookSchema } from "../schemas";
import { BaseService } from "./base.service";

export class BookService extends BaseService<BookSchema, IBook> {
    constructor(
        protected model: typeof BookSchema,
        private messageBroker: IMessageBroker,
    ) {
        super(model);
    }

    override async create(data: Partial<IBook>): Promise<BookSchema> {
        const book = await super.create(data);
        const event: IEventMessageBroker = {
            type: 'BOOK_EVENT_CREATED',
            data: {
                bookId: book.id,
                title: book.title,
                createdAt: book.createdAt,
            },
        };

        await this._publishMessage('book.event.create', event);

        return book;
    }

    private async _publishMessage(routingKey: string, event: IEventMessageBroker): Promise<void> {
        try {
            await this.messageBroker.publish<IEventMessageBroker>(
                'library_exchange',
                routingKey,
                event,
            );
        } catch (error) {
            console.warn(new InternalServerError(error));
        }
    }
}
