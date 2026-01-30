import { Injectable, NotFoundException } from '@nestjs/common';

export interface Client {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class ClientsService {
  private clients: Client[] = [];
  private idCounter = 1;

  create(name: string, email: string): Client {
    const client = { id: this.idCounter++, name, email };
    this.clients.push(client);
    return client;
  }

  findAll(): Client[] {
    return this.clients;
  }

  findOne(id: number) {
    const client = this.clients.find((c) => c.id === id);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }
}
