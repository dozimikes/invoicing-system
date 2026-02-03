import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(email: string, password: string, role?: string): Promise<Omit<User, 'password'>> {
        // Check if user already exists
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: role as any,
            },
        });

        // Return user without password
        const { password: _, ...result } = user;
        return result;
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        const users = await this.prisma.user.findMany();
        return users.map(({ password, ...user }) => user);
    }

    async findOne(id: number): Promise<Omit<User, 'password'>> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const { password, ...result } = user;
        return result;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async remove(id: number): Promise<Omit<User, 'password'>> {
        try {
            const user = await this.prisma.user.delete({ where: { id } });
            const { password, ...result } = user;
            return result;
        } catch (error) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
