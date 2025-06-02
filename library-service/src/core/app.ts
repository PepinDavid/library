import express, { Application, Router } from "express";
import cors from "cors";
import { IRootRoutes } from "../interfaces/routes.interface";
import { ServiceInstanceRegistry } from "./servicesRegistry";
import { ControllerFactory } from "./controllerFactory";
import { TController } from "../interfaces/controller.interface";


export async function appConfig(): Promise<Application> {
    console.log('Configure app express');

    const app = express();
    const corsOptions = {
        origin: '*',
    };

    app.use([
        cors(corsOptions),
        express.json(),
    ]);

    return app;
};

export async function createRoute(app: Application, rootRoutesArray: IRootRoutes[]): Promise<Application> {
    console.log('Initialize routes api');
    let baseRouter: Router;

    for (const route of rootRoutesArray) {
        baseRouter = Router();
        const { name, middleware, routes} = route;
        let elementRouter: Router;

        for (const elementRoute of routes) {
            elementRouter = Router();
            const nameElement = elementRoute.name;
            const services: unknown[] = [];


            if (elementRoute?.services) {
                for (const service of elementRoute.services) {
                    services.push(
                        ServiceInstanceRegistry.getInstance(service),
                    );
                }
            }

            const controller = ControllerFactory.createController<TController>(
                elementRoute.controller,
                ...services,
            );

            for (const route of elementRoute.routes) {
                const nameFunction = (route.nameFunction ?? route.method);
                const handler = (controller as any)[nameFunction].bind(controller);

                elementRouter[route.method](
                    route.uri,
                    route.middleware,
                    handler,
                );
            }

            if (middleware)
                baseRouter.use(`/${nameElement}`, middleware, elementRouter);
            else
                baseRouter.use(`/${name}`, elementRouter);
        }
        
        app.use(`/${name}`, baseRouter);
    }

    console.log('Routes api created');

    return app;
}
