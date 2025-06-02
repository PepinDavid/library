import { EControllerName } from "../interfaces/controller.interface";
import { IRoutesMap } from "../interfaces/routes.interface";
import { EServicesName } from "../interfaces/service.interface";
import { authorizationRoleMiddleware } from "../middlewares/authorizationRole.middleware";
import { validationDTOMiddleware } from "../middlewares/validationDTO.middleware";
import { validationParamsMiddleware } from "../middlewares/validationParams.middleware";
import { CreateBookDTO, UpdateBookDTO } from "../models/book.models";


export const bookRoutes: IRoutesMap = {
    name: 'books',
    controller: EControllerName.BookController,
    services: [
        EServicesName.BookService,
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
                validationDTOMiddleware(CreateBookDTO),
            ],
            nameFunction: 'create',
        },
        {
            method: 'put',
            uri: '/:id',
            middleware: [
                authorizationRoleMiddleware,
                validationParamsMiddleware,
                validationDTOMiddleware(UpdateBookDTO),
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