import { PrismaService } from '../prisma/prisma.service';
import type { User } from '../prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(email: string, password: string, role?: string): Promise<Omit<User, 'password'>>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    findOne(id: number): Promise<Omit<User, 'password'>>;
    findByEmail(email: string): Promise<User | null>;
    remove(id: number): Promise<Omit<User, 'password'>>;
}
