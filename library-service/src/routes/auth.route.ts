import { EServicesName } from '../interfaces/service.interface';
import { EControllerName } from '../interfaces/controller.interface';
import { IRoutesMap } from '../interfaces/routes.interface';

export const connexionRoutes: IRoutesMap = {
    name: 'identify',
    controller: EControllerName.AuthController,
    services: [
        EServicesName.AuthService,
    ],
    routes: [
        {
            method: 'post',
            uri: '/login',
            middleware: [],
            nameFunction: 'login',
        },
    ],
};
