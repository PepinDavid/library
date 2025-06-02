import { Request, Response } from "express";
import { IBaseController } from "../interfaces/controller.interface";
import { ParamsNotFound } from "../errors/paramsNotFound";
import { CreateGenreDTO, UpdateGenreDTO } from "../models/genre.models";
import { IBaseService } from "../interfaces/service.interface";

export class GenreController implements IBaseController {
    constructor(
        private readonly service: IBaseService<CreateGenreDTO, UpdateGenreDTO>,
    ) {

    }

    async getAll(_: Request, response: Response): Promise<void> {
        const genres = await this.service.getAll();

        response.status(200).json({genres});
    }

    async getOne(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const genre = await this.service.getOne(id);

        response.status(200).json({genre});
    }

    async create(request: Request, response: Response): Promise<void> {
        const genre = request.body as CreateGenreDTO;

        const genreCreated = await this.service.create(genre);

        response.status(201).json({genre: genreCreated});
    }

    async update(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const genre = request.body as UpdateGenreDTO;
        const genreUpdated = await this.service.update(id, genre);

        response.status(200).json({genre: genreUpdated});
    }

    async delete(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const genreDeleted = await this.service.delete(id);

        response.status(200).json({genre: genreDeleted});
    }
}