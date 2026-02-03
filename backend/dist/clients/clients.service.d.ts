import { PrismaService } from '../prisma/prisma.service';
import type { Client } from '@prisma/client';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(name: string, email: string): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client | null>;
    update(id: number, data: {
        name?: string;
        email?: string;
    }): Promise<Client>;
    remove(id: number): Promise<Client>;
}
