import { NextFunction, Request, Response } from "express";
import { IBaseService } from "../interfaces/service.interface";
import { ParamsNotFound } from "../errors/paramsNotFound";
import { CreateGenreBookDTO, IGenreBook, UpdateGenreBookDTO } from "../models/genre-book.models";

export class GenreBookController {
    constructor(
        private readonly service: IBaseService<CreateGenreBookDTO, IGenreBook>
    ) {

    }

    async getAll(_: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const genreBooks = await this.service.getAll();
    
                response.status(200).json({ genreBooks });
            } catch (error) {
                next(error);
            }
        }
    
        async getOne(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const { id } = request.params;
    
                const genreBook = await this.service.getOne(id);
    
                response.status(200).json({genreBook});
            } catch (error) {
                console.log(error)
                next(error);
            }
        }
    
        async create(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const genreBook = request.body as CreateGenreBookDTO;
                const genreBookCreated = await this.service.create(genreBook);
    
                response.status(201).json({genreBook: genreBookCreated});
            } catch (error) {
                next(error);
            }
        }
    
        async update(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const {id} = request.params;
    
                const genreBook = request.body as UpdateGenreBookDTO;
                const genreBookUpdated = await this.service.update(id, genreBook);
    
                response.status(201).json({genreBook: genreBookUpdated});
            } catch (error) {
                next(error);
            }
        }
    
        async delete(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                const {id} = request.params;
    
                if (!id) throw new ParamsNotFound(`Params id not found`);
    
                const genreBookDeleted = await this.service.delete(id);
    
                response.status(201).json({genreBook: genreBookDeleted});
            } catch (error) {
                next(error);
            }
        }
}
