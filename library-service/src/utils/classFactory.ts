export type TConstructor<T, Args extends unknown> = new (...args: Args[]) => T;
export type Constructor = new (...args: unknown[]) => unknown;

export class ClassFactory {
    private static registryClass = new Map<string, unknown>();

    public static register<T, Args extends unknown[]>(key: string, ctor: TConstructor<T, Args>): void {
        if (!this.registryClass.has(key)) {
            this.registryClass.set(key, ctor);
        }
    }

    public static createClass<T>(key: string, ...args: unknown[]): T {
        if (!this.registryClass.has(key)) {
            throw new Error(`Class ${key} is not registered`);
        }

        const ctr = this.registryClass.get(key)!;

        if (isClassType(ctr)) {
            if (args) {
                return new ctr(...args) as T;
            }

            return new ctr() as T;
        }

        return ctr as T;

        function isClassType(obj: unknown): obj is Constructor {
            return typeof obj === 'function' && /^class\s/.test(obj.toString());
        }
    }
}