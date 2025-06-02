import { RequestHandler } from "express";
import { EControllerName } from "./controller.interface";
import { EServicesName } from "./service.interface";

export interface IRoutesMap {
    name: string;
    controller: EControllerName;
    services?: EServicesName[];
    routes: {
        method: 'get' | 'put' | 'patch' | 'post' | 'delete';
        uri: string;
        nameFunction?: string;
        middleware: RequestHandler[];
    }[]
}

export interface IRootRoutes {
    name: string;
    middleware?: RequestHandler[];
    routes: IRoutesMap[];
}