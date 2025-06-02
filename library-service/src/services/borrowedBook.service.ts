import { InternalServerError } from "../errors/internalServerError";
import { IEventMessageBroker } from "../interfaces/message-broker.interface";
import { IMessageBroker } from "../interfaces/service.interface";
import { IBorrowedBook } from "../models";
import { BookSchema, BorrowedBookSchema, UserSchema } from "../schemas";
import { BaseService } from "./base.service"

export class BorrowedBookService extends BaseService<BorrowedBookSchema, IBorrowedBook> {
    constructor(
        protected readonly model: typeof BorrowedBookSchema,
        private messageBroker: IMessageBroker,
    ) {
        super(model);
    }

    override async create(data: Partial<IBorrowedBook>): Promise<BorrowedBookSchema> {
        try {
            const createdBorrowedBook = await super.create(data);
            const borrowedBook = await this.model.findByPk(
                createdBorrowedBook.id,
                {
                    include: [
                        { model: UserSchema },
                        { model: BookSchema },
                    ],
                },
            );
            
            if (borrowedBook) {
                const event: IEventMessageBroker = {
                    type: 'BORROWED_EVENT_TYPE',
                    data: {
                        book: borrowedBook.book,
                        user: borrowedBook.user,
                        borrowDate: borrowedBook.borrowDate,
                        createdAt: borrowedBook.createdAt,
                    },
                };

                await this._publishMessage('book.event.create', event);
            }

            return borrowedBook!;
        } catch (error) {
            throw new InternalServerError(error);
        }
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