import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import type { Client } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(
      createClientDto.name,
      createClientDto.email,
    );
  }

  @Get()
  findAll(): Client[] {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Client | undefined {
    return this.clientsService.findOne(Number(id));
  }
}
