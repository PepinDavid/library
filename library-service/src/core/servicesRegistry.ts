export class ServiceInstanceRegistry {
    private static serviceRegistryMap: Map<string, unknown> = new Map();

    public static setInstance(serviceName: string, instance: unknown): void {
        if (!this.serviceRegistryMap.has(serviceName)) {
            this.serviceRegistryMap.set(serviceName, instance);
        } else {
            console.warn(`${serviceName} is already registered, skipping...`)
        }
    }

    public static getInstance<T>(serviceName: string): T {
        if (!this.serviceRegistryMap.has(serviceName)) {
            throw new Error(`Service doesn't exist: ${serviceName}`);
        }

        return this.serviceRegistryMap.get(serviceName)! as T;
    }
}
