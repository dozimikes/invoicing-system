import { PrismaService } from '../prisma/prisma.service';
import type { Invoice, InvoiceStatus } from '@prisma/client';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(clientId: number, amount: number, description: string): Promise<Invoice>;
    findAll(): Promise<Invoice[]>;
    findOne(id: number): Promise<Invoice | null>;
    findByClient(clientId: number): Promise<Invoice[]>;
    update(id: number, data: {
        amount?: number;
        description?: string;
        status?: InvoiceStatus;
    }): Promise<Invoice>;
    remove(id: number): Promise<Invoice>;
}
