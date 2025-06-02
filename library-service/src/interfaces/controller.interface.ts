import { NextFunction, Request, Response } from "express";
import { 
    AuthController,
    AuthorController,
    BookController,
    BorrowedBookController,
    GenreController,
    UserController,
} from "../controllers";
import { AuthorBookController } from "../controllers/author-book.controller";
import { GenreBookController } from "../controllers/genre-book.controller";

export interface IBaseController {
    getAll(request: Request, response: Response, next?: NextFunction): Promise<void>;
    getOne(request: Request, response: Response, next?: NextFunction): Promise<void>;
    create(request: Request, response: Response, next?: NextFunction): Promise<void>;
    update(request: Request, response: Response, next?: NextFunction): Promise<void>;
    delete(request: Request, response: Response, next?: NextFunction): Promise<void>;
}

export type TControllerConstructor<TController, TArgs extends unknown[]> = new (...args: TArgs) => TController;

export enum EControllerName {
    AuthController = "AuthController",
    AuthorBookController = "AuthorBookController",
    AuthorController = "AuthorController",
    BookController = "BookController",
    BorrowedBookController = "BorrowedBookController",
    GenreController = "GenreController",
    GenreBookController = "GenreBookController",
    UserController = "UserController",
}

export enum EHTTPStatus {
    OK = 200,
    CREATE = 201,
    NO_CONTENT = 204,
    NO_AUTHENTICATED = 401,
    UNAUTHORIZED = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}

export type TController = AuthController |
AuthorBookController |
AuthorController |
BookController |
BorrowedBookController |
GenreController |
GenreBookController |
UserController;