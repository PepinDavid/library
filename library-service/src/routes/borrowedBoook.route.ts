import { EControllerName } from "../interfaces/controller.interface";
import { IRoutesMap } from "../interfaces/routes.interface";
import { EServicesName } from "../interfaces/service.interface";
import { authorizationRoleMiddleware } from "../middlewares/authorizationRole.middleware";
import { validationDTOMiddleware } from "../middlewares/validationDTO.middleware";
import { validationParamsMiddleware } from "../middlewares/validationParams.middleware";
import { CreateBorrowedBookDTO, UpdateBorrowedBookDTO } from "../models/borrowedBook.model";

export const borrowedBookRoutes: IRoutesMap = {
    name: 'borrowed-books',
    controller: EControllerName.BorrowedBookController,
    services: [
        EServicesName.BorrowedBookService,
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
                validationDTOMiddleware(CreateBorrowedBookDTO),
            ],
            nameFunction: 'create',
        },
        {
            method: 'put',
            uri: '/:id',
            middleware: [
                authorizationRoleMiddleware,
                validationParamsMiddleware,
                validationDTOMiddleware(UpdateBorrowedBookDTO),
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