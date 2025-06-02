import { EControllerName } from "../interfaces/controller.interface";
import { IRoutesMap } from "../interfaces/routes.interface";
import { EServicesName } from "../interfaces/service.interface";
import { authorizationRoleMiddleware } from "../middlewares/authorizationRole.middleware";
import { validationDTOMiddleware } from "../middlewares/validationDTO.middleware";
import { validationParamsMiddleware } from "../middlewares/validationParams.middleware";
import { CreateAuthorBookDTO, UpdateAuthorBookDTO } from "../models/author-book.models";

export const authorBookRoutes: IRoutesMap = {
    name: 'author-book',
    controller: EControllerName.AuthorBookController,
    services: [
        EServicesName.AuthorBookService
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
                validationDTOMiddleware(CreateAuthorBookDTO),
            ],
            nameFunction: 'create',
        },
        {
            method: 'put',
            uri: '/:id',
            middleware: [
                authorizationRoleMiddleware,
                validationParamsMiddleware,
                validationDTOMiddleware(UpdateAuthorBookDTO),
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
