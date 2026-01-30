# Invoicing System

A simple and efficient invoicing system built with **NestJS**, **MySQL**, and **Prisma 7**. This project provides a core API for managing clients and their associated invoices.

## Features

- **Client Management**: Create, view, and list clients.
- **Invoice Tracking**: Create and retrieve invoices linked to specific clients.
- **Modern Persistence**: Uses Prisma 7 with a tailored configuration for WSL/Windows development.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Environment**: [Node.js](https://nodejs.org/)

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- MySQL Server
- WSL (if developing on Windows)

### Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` file in the root directory and add your MySQL connection string:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

3. **Initialize Database**:
   Push the Prisma schema to your local MySQL instance:
   ```bash
   npx prisma db push
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

## Running the App

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Clients
- `POST /clients` - Create a new client.
- `GET /clients` - List all clients.
- `GET /clients/:id` - Get client details.

### Invoices
- `POST /invoices` - Create a new invoice.
- `GET /invoices` - List all invoices.
- `GET /invoices/:id` - Get invoice details.
- `GET /invoices/client/:clientId` - List invoices for a specific client.

## License

MIT
