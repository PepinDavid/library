import { NextFunction, Request, Response } from "express";
import { IBaseService } from "../interfaces/service.interface";
import { CreateAuthorBookDTO, IAuthorBooks, UpdateAuthorBookDTO } from "../models/author-book.models";
import { ParamsNotFound } from "../errors/paramsNotFound";

export class AuthorBookController {
    constructor(
        private readonly service: IBaseService<CreateAuthorBookDTO, IAuthorBooks>
    ) {

    }

    async getAll(_: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const authorBooks = await this.service.getAll();
    
                response.status(200).json({ authorBooks });
            } catch (error) {
                next(error);
            }
        }
    
        async getOne(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const { id } = request.params;
    
                const authorBook = await this.service.getOne(id);
    
                response.status(200).json({authorBook});
            } catch (error) {
                console.log(error)
                next(error);
            }
        }
    
        async create(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const authorBook = request.body as CreateAuthorBookDTO;
                const authorBookCreated = await this.service.create(authorBook);
    
                response.status(201).json({authorBook: authorBookCreated});
            } catch (error) {
                next(error);
            }
        }
    
        async update(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const {id} = request.params;
    
                const authorBook = request.body as UpdateAuthorBookDTO;
                const authorBookUpdated = await this.service.update(id, authorBook);
    
                response.status(201).json({authorBook: authorBookUpdated});
            } catch (error) {
                next(error);
            }
        }
    
        async delete(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const {id} = request.params;
    
                if (!id) throw new ParamsNotFound(`Params id not found`);
    
                const authorBookDeleted = await this.service.delete(id);
    
                response.status(201).json({authorBook: authorBookDeleted});
            } catch (error) {
                next(error);
            }
        }
}
