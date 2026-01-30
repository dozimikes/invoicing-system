import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [ClientsModule, InvoicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
