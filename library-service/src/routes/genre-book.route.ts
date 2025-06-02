import { EControllerName } from "../interfaces/controller.interface";
import { IRoutesMap } from "../interfaces/routes.interface";
import { EServicesName } from "../interfaces/service.interface";
import { authorizationRoleMiddleware } from "../middlewares/authorizationRole.middleware";
import { validationDTOMiddleware } from "../middlewares/validationDTO.middleware";
import { validationParamsMiddleware } from "../middlewares/validationParams.middleware";
import { CreateGenreBookDTO, UpdateGenreBookDTO } from "../models/genre-book.models";

export const genreBookRoutes: IRoutesMap = {
    name: 'genre-book',
    controller: EControllerName.GenreBookController,
    services: [
        EServicesName.GenreBookService,
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
                validationDTOMiddleware(CreateGenreBookDTO),
            ],
            nameFunction: 'create',
        },
        {
            method: 'put',
            uri: '/:id',
            middleware: [
                authorizationRoleMiddleware,
                validationParamsMiddleware,
                validationDTOMiddleware(UpdateGenreBookDTO),
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
    ]
};
