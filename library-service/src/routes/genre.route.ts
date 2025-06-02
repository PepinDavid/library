import { CreateGenreDTO, UpdateGenreDTO } from "../models/genre.models";
import { EControllerName } from "../interfaces/controller.interface";
import { EServicesName } from "../interfaces/service.interface";
import { authorizationRoleMiddleware } from "../middlewares/authorizationRole.middleware";
import { validationParamsMiddleware } from "../middlewares/validationParams.middleware";
import { validationDTOMiddleware } from "../middlewares/validationDTO.middleware";
import { IRoutesMap } from "../interfaces/routes.interface";

export const genreRoutes: IRoutesMap = {
    name: 'genres',
    controller: EControllerName.GenreController,
    services: [
        EServicesName.GenreService,
    ],
    routes: [
        {
            method: 'get',
            uri: '',
            middleware: [],
            nameFunction: 'getAll',
        },
        {
            method: 'get',
            uri: '/:id',
            middleware: [
                validationParamsMiddleware,
            ],
            nameFunction: 'getOne',
        },
        {
            method: 'post',
            uri: '/',
            middleware: [
                authorizationRoleMiddleware,
                validationDTOMiddleware(CreateGenreDTO),
            ],
            nameFunction: 'create',
        },
        {
            method: 'put',
            uri: '/:id',
            middleware: [
                authorizationRoleMiddleware,
                validationParamsMiddleware,
                validationDTOMiddleware(UpdateGenreDTO),
            ],
            nameFunction: 'update',
        },
        {
            method: 'delete',
            uri: '/:id',
            middleware: [
                authorizationRoleMiddleware,
                validationParamsMiddleware,
            ],
            nameFunction: 'delete',
        },
    ],
};
