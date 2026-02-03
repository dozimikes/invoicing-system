import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import type { Invoice } from '@prisma/client';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice>;
    findAll(): Promise<Invoice[]>;
    findByClient(clientId: string): Promise<Invoice[]>;
    findOne(id: string): Promise<Invoice | null>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice>;
    remove(id: string): Promise<Invoice>;
}
