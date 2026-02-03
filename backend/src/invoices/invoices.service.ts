import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Invoice, InvoiceStatus } from '@prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) { }

  async create(clientId: number, amount: number, description: string): Promise<Invoice> {
    return this.prisma.invoice.create({
      data: { clientId, amount, description },
    });
  }

  async findAll(): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Invoice | null> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { client: true },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async findByClient(clientId: number): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({ where: { clientId } });
  }

  async update(id: number, data: { amount?: number; description?: string; status?: InvoiceStatus }): Promise<Invoice> {
    try {
      return await this.prisma.invoice.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<Invoice> {
    try {
      return await this.prisma.invoice.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
  }
}
