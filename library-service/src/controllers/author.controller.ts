import { Request, Response } from "express";
import { ParamsNotFound } from "../errors/paramsNotFound";
import { IBaseController } from "../interfaces/controller.interface";
import { CreateAuthorDTO, UpdateAuthorDTO } from "../models/author.models";
import { IBaseService } from "../interfaces/service.interface";

export class AuthorController implements IBaseController {
    constructor(
        private readonly service: IBaseService<CreateAuthorDTO, UpdateAuthorDTO>,
    ) {
    }
    
    async getAll(_: Request, response: Response): Promise<void> {
        const authors = await this.service.getAll();

        response.status(200).json({ authors });
    }

    async getOne(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const author = await this.service.getOne(id);

        response.status(200).json({ author });
    }

    async create(request: Request, response: Response): Promise<void> {
        const author = request.body as CreateAuthorDTO;
        const authorCreated = await this.service.create(author);

        response.status(201).json({ author: authorCreated });
    }

    async update(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const author = request.body as UpdateAuthorDTO;
        const authorUpdated = await this.service.update(id, author);

        response.status(200).json({ author: authorUpdated });
    }

    async delete(request: Request, response: Response): Promise<void> {
        const {id} = request.params;

        if (!id) throw new ParamsNotFound(`Params id not found`);

        const authorDeleted = await this.service.delete(id);

        response.status(201).json({ author: authorDeleted });
    }
}
