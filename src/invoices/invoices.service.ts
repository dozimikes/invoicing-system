import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Invoice } from '../prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) { }

  async create(clientId: number, amount: number, description: string): Promise<Invoice> {
    return this.prisma.invoice.create({
      data: { clientId, amount, description },
    });
  }

  async findAll(): Promise<Invoice[]> {
    return this.prisma.invoice.findMany();
  }

  async findOne(id: number): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({ where: { id } });
  }

  async findByClient(clientId: number): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({ where: { clientId } });
  }
}
