import net from 'net';
import { EServicesName } from "../interfaces/service.interface";
import { ERole } from "../models";
import { UserService } from "../services/user.service";
import argon2, { argon2id, Options, verify } from "argon2";
import { InternalServerError } from '../errors/internalServerError';
import { ServiceInstanceRegistry } from '../core/servicesRegistry';

export async function createUsers() {
    const userService = ServiceInstanceRegistry.getInstance<UserService>(EServicesName.UserService)

    try {
        await userService.create({
            email: "admin@admin.com",
            username: "admin",
            password: "admin",
            role: ERole.ADMIN,
        });
    } catch (error) {
        throw new InternalServerError(`admin not created ${error}`);
    }

    try {
        await userService.create({
            email: "reader@reader.com",
            username: "reader",
            password: "reader",
            role: ERole.READER,
        });
    } catch (error) {
        throw new InternalServerError(`reader not created ${error}`);
    }

}

export function testPostgresConnection(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const socket = net.connect({ host, port }, () => {
            console.log(`Connected to ${host}:${port}`);
            socket.end();
            resolve();
        });

        socket.on('error', (err) => {
            console.error(`Cannot connect to ${host}:${port} -`, err.message);
            reject(err);
        });
    });
}

export async function verifyPassword(hashPassword:string, passwordClear: string): Promise<boolean> {
    try {
        return await verify(hashPassword, passwordClear);
    } catch(error) {
        console.warn("Error: check password: ", error);
        return false;
    }
}

export async function hashPassword(password: string): Promise<string> {
    const defaultHashOptions: Options & { raw?: false } = {
        type: argon2id,
        memoryCost: 2 ** 16,   // 64 MiB
        timeCost: 5,           // 5 itérations
        parallelism: 2,        // 2 threads
    };

    return await argon2.hash(
        password,
        defaultHashOptions,
    );
}

export function waitForService(fnInit: Promise<any>, retries: number = 5, delay: number = 3000): Promise<any> {
    return fnInit
    .catch(err => {
        return new Promise((res, rej) => {
            if (retries) {
                setTimeout(() => {
                    retries--;
                    res(waitForService(fnInit, retries, delay));
                }, delay);
            } else {
                rej(err);
            }
        })
    })
}