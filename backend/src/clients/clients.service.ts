import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Client } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) { }

  async create(name: string, email: string): Promise<Client> {
    try {
      return await this.prisma.client.create({
        data: { name, email },
      });
    } catch (error: any) {
      // Prisma unique constraint violation error code
      if (error.code === 'P2002') {
        throw new ConflictException('A client with this email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async findOne(id: number): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, data: { name?: string; email?: string }): Promise<Client> {
    try {
      return await this.prisma.client.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<Client> {
    try {
      return await this.prisma.client.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
  }
}
