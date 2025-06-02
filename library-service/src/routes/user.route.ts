import { EControllerName } from "../interfaces/controller.interface";
import { IRoutesMap } from "../interfaces/routes.interface";
import { EServicesName } from "../interfaces/service.interface";
import { authorizationRoleMiddleware } from "../middlewares/authorizationRole.middleware";
import { validationDTOMiddleware } from "../middlewares/validationDTO.middleware";
import { validationParamsMiddleware } from "../middlewares/validationParams.middleware";
import { CreateUserDTO, UpdateUserDTO } from "../models/user.models";

export const userRoutes: IRoutesMap = {
    name: 'users',
    controller: EControllerName.UserController,
    services: [
        EServicesName.UserService,
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
                validationDTOMiddleware(CreateUserDTO),
            ],
            nameFunction: 'create',
        },
        {
            method: 'put',
            uri: '/:id',
            middleware: [
                authorizationRoleMiddleware,
                validationParamsMiddleware,
                validationDTOMiddleware(UpdateUserDTO),
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