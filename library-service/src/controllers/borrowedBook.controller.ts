import { Request, Response } from "express";
import { IBaseController } from "../interfaces/controller.interface";
import { ParamsNotFound } from "../errors/paramsNotFound";
import { IBaseService } from "../interfaces/service.interface";
import { BorrowedBook } from "../models/borrowedBook.model";

export class BorrowedBookController implements IBaseController {
    constructor(
        private readonly service: IBaseService<BorrowedBook, BorrowedBook>,
    ) {

    }

    async getAll(_: Request, response: Response): Promise<void> {
        const borrowedBooks = await this.service.getAll();

        response.status(200).json({borrowedBooks});
    }

    async getOne(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const borrowedBook = await this.service.getOne(id);

        response.status(200).json({borrowedBook});
    }

    async create(request: Request, response: Response): Promise<void> {
        const borrowedBook = request.body;
        const borrowedBookCreated = await this.service.create(borrowedBook!);

        response.status(201).json({borrowedBook: borrowedBookCreated});
    }

    async update(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const borrowedBook = request.body;
        const borrowedBookUpdated = await this.service.update(id, borrowedBook!);

        response.status(200).json({borrowedBook: borrowedBookUpdated});
    }

    async delete(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const borrowedBookDeleted = await this.service.delete(id);

        response.status(200).json({borrowedBook: borrowedBookDeleted});
    }
}