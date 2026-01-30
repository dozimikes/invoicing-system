import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Client } from '../prisma/client';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) { }

  async create(name: string, email: string): Promise<Client> {
    return this.prisma.client.create({
      data: { name, email },
    });
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async findOne(id: number): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { id } });
  }
}
