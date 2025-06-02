import { config } from "../config/config";
import { EControllerName } from "../interfaces/controller.interface";
import { EServicesName } from "../interfaces/service.interface";
import { ControllerFactory } from "./controllerFactory";
import { ServiceFactory } from "./servicesFactory";
import { ServiceInstanceRegistry } from "./servicesRegistry";
import {
    AuthorBookSchema,
    AuthorSchema,
    BookSchema,
    BorrowedBookSchema,
    GenreSchema,
    UserSchema,
} from "../schemas";
import {
    AuthController,
    AuthorController,
    BookController,
    BorrowedBookController,
    GenreController,
    UserController,
} from "../controllers";
import { 
    AuthorService,
    AuthService,
    BookService,
    BorrowedBookService,
    GenreService,
    RabbitMQService,
    UserService,
} from "../services";
import { Channel } from "amqplib";
import { rabbitMQCoonector } from "../connectors/rabbitmq.connector";
import { AuthorBookController } from "../controllers/author-book.controller";
import { AuthorBookService } from "../services/author-book.service";
import { GenreBookController } from "../controllers/genre-book.controller";
import { GenreBookService } from "../services/genre-book.service";
import { GenreBookSchema } from "../schemas/genre-book.schema";

export function registerController(): void {
    console.log('registerController start');
    ControllerFactory.register<AuthController, [AuthService]>(EControllerName.AuthController, AuthController);
    ControllerFactory.register<AuthorController, [AuthorService]>(EControllerName.AuthorController, AuthorController);
    ControllerFactory.register<BookController, [BookService]>(EControllerName.BookController, BookController);
    ControllerFactory.register<BorrowedBookController, [BorrowedBookService]>(EControllerName.BorrowedBookController, BorrowedBookController);
    ControllerFactory.register<GenreController, [GenreService]>(EControllerName.GenreController, GenreController);
    ControllerFactory.register<UserController, [UserService]>(EControllerName.UserController, UserController);
    ControllerFactory.register<AuthorBookController, [AuthorBookService]>(EControllerName.AuthorBookController, AuthorBookController);
    ControllerFactory.register<GenreBookController, [GenreBookService]>(EControllerName.GenreBookController, GenreBookController);

    console.log('registerController finished');
};

export function registerServices() {
    console.log('registerServices start');
    const jwtSecret = config.jwt.secret;
    const jwtExpired = config.jwt.expiresIn;

    ServiceFactory.registerService<RabbitMQService, [Channel]>(EServicesName.RabbitMQService, RabbitMQService);
    ServiceFactory.registerService<AuthService, [string, number, typeof UserSchema]>(EServicesName.AuthService, AuthService);
    ServiceFactory.registerService<AuthorService, [typeof AuthorSchema]>(EServicesName.AuthorService, AuthorService);
    ServiceFactory.registerService<BookService, [typeof BookSchema, RabbitMQService]>(EServicesName.BookService, BookService);
    ServiceFactory.registerService<BorrowedBookService, [typeof BorrowedBookSchema, RabbitMQService]>(EServicesName.BorrowedBookService, BorrowedBookService);
    ServiceFactory.registerService<GenreService, [typeof GenreSchema]>(EServicesName.GenreService, GenreService);
    ServiceFactory.registerService<UserService, [typeof UserSchema]>(EServicesName.UserService, UserService);
    ServiceFactory.registerService<GenreBookService, [typeof GenreBookSchema]>(EServicesName.GenreBookService, GenreBookService);
    ServiceFactory.registerService<AuthorBookService, [typeof AuthorBookSchema]>(EServicesName.AuthorBookService, AuthorBookService);

    ServiceInstanceRegistry.setInstance(
        EServicesName.RabbitMQService,
        ServiceFactory.createService<RabbitMQService>(EServicesName.RabbitMQService, rabbitMQCoonector.getChannel()),
    );
    ServiceInstanceRegistry.setInstance(
        EServicesName.AuthorService,
        ServiceFactory.createService<AuthorService>(EServicesName.AuthorService, AuthorSchema),
    );
    ServiceInstanceRegistry.setInstance(
        EServicesName.BookService,
        ServiceFactory.createService<BookService>(
            EServicesName.BookService,
            BookSchema,
            ServiceInstanceRegistry.getInstance(EServicesName.RabbitMQService),
        ),
    );
    ServiceInstanceRegistry.setInstance(
        EServicesName.BorrowedBookService,
        ServiceFactory.createService<BorrowedBookService>(EServicesName.BorrowedBookService, BorrowedBookSchema, rabbitMQCoonector.getChannel()),
    );
    ServiceInstanceRegistry.setInstance(
        EServicesName.GenreService,
        ServiceFactory.createService<GenreService>(EServicesName.GenreService, GenreSchema),
    );
    ServiceInstanceRegistry.setInstance(
        EServicesName.UserService,
        ServiceFactory.createService<UserService>(EServicesName.UserService, UserSchema),
    );

    ServiceInstanceRegistry.setInstance(
        EServicesName.AuthService,
        ServiceFactory.createService<AuthService>(EServicesName.AuthService, jwtSecret, jwtExpired, UserSchema),
    );

    ServiceInstanceRegistry.setInstance(
        EServicesName.AuthorBookService,
        ServiceFactory.createService<AuthorBookService>(EServicesName.AuthorBookService, AuthorBookSchema),
    );

    ServiceInstanceRegistry.setInstance(
        EServicesName.GenreBookService,
        ServiceFactory.createService<GenreBookService>(EServicesName.GenreBookService, GenreBookSchema),
    );

    console.log('Services registered');
}
