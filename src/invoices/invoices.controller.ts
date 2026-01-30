import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import type { Invoice, Product } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto): Invoice {
    return this.invoicesService.create(createInvoiceDto.clientId);
  }

  @Get()
  findAll(): Invoice[] {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Invoice {
    return this.invoicesService.findOne(Number(id));
  }

  @Post(':id/products')
  addProduct(@Param('id') id: string, @Body() product: Product): Invoice {
    return this.invoicesService.addProduct(Number(id), product);
  }
}
