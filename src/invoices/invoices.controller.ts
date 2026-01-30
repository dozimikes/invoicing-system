import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import type { Invoice } from '../prisma/client';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoicesService.create(
      createInvoiceDto.clientId,
      createInvoiceDto.amount,
      createInvoiceDto.description,
    );
  }

  @Get()
  async findAll(): Promise<Invoice[]> {
    return this.invoicesService.findAll();
  }

  @Get('client/:clientId')
  async findByClient(@Param('clientId') clientId: string): Promise<Invoice[]> {
    return this.invoicesService.findByClient(Number(clientId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Invoice | null> {
    return this.invoicesService.findOne(Number(id));
  }
}