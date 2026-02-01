import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import type { Invoice } from '../prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    return this.invoicesService.update(Number(id), updateInvoiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Invoice> {
    return this.invoicesService.remove(Number(id));
  }
}