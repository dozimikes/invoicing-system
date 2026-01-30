import { Injectable, NotFoundException } from '@nestjs/common';

export interface Invoice {
  id: number;
  clientId: number;
  items: Product[];
  total: number;
  paid: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable()
export class InvoicesService {
  private invoices: Invoice[] = [];
  private idCounter = 1;

  create(clientId: number): Invoice {
    const invoice: Invoice = {
      id: this.idCounter++,
      clientId,
      items: [],
      total: 0,
      paid: false,
    };
    this.invoices.push(invoice);
    return invoice;
  }

  findAll(): Invoice[] {
    return this.invoices;
  }

  findOne(id: number): Invoice {
    const invoice = this.invoices.find((inv) => inv.id === id);
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  addProduct(invoiceId: number, product: Product): Invoice {
    const invoice = this.findOne(invoiceId);
    invoice.items.push(product);
    invoice.total = invoice.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return invoice;
  }
}
