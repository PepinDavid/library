import { TControllerConstructor } from "../interfaces/controller.interface";

export class ControllerFactory {
    private static controllersRgister: Map<string, unknown> = new Map();

    public static register<TController, TArgs extends unknown[]>(controllerName: string, controllerClass: TControllerConstructor<TController, TArgs>): void {
        if (!this.controllersRgister.has(controllerName)) {
            this.controllersRgister.set(controllerName, controllerClass);
        }
    }

    public static createController<TController>(controllerName: string, ...args: unknown[]): TController {
        const controllerConstructeur = this.controllersRgister.get(controllerName) as TControllerConstructor<TController, unknown[]>;

        if (!controllerConstructeur) {
            throw new Error(`Controller ${controllerName} is not registerd`);
        }

        if (args) {
            return new controllerConstructeur(...args) as TController;
        }

        return new controllerConstructeur() as TController;
    }
}