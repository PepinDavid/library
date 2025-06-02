import { TServiceConstructor } from "../interfaces/service.interface";

export class ServiceFactory {
    private static serviceRegistry: Map<string, unknown> = new Map();

    public static registerService<TService, TArgs extends unknown[]>(serviceName: string, serviceClass: TServiceConstructor<TService, TArgs>): void {
        if (!this.serviceRegistry.has(serviceName)) {
            this.serviceRegistry.set(serviceName, serviceClass);
        }
    }

    public static createService<TService>(serviceName: string, ...args: unknown[]): TService {
        const serviceConstructor = this.serviceRegistry.get(serviceName) as TServiceConstructor<TService, unknown[]>;

        if (!serviceConstructor) {
            throw new Error(`Service ${serviceName} is not registered.`);
        }

        if (args) {
            return new serviceConstructor(...args) as TService;
        }

        return new serviceConstructor() as TService;
    }
}