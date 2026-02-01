# Invoicing System

A full-stack invoicing system built with NestJS (backend) and Next.js (frontend).

## Project Structure

```
invoicing-system/
├── backend/          # NestJS backend API
│   ├── src/          # Backend source code
│   ├── prisma/       # Database schema and migrations
│   └── test/         # Backend tests
├── frontend/         # Next.js frontend application
│   └── src/          # Frontend source code
└── package.json      # Monorepo scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the backend directory
   - Configure your database connection and other settings

4. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

### Development

Run backend and frontend in separate terminals:

**Backend:**
```bash
npm run backend:dev
# or: cd backend && npm run start:dev
```

**Frontend:**
```bash
npm run frontend:dev
# or: cd frontend && npm run dev
```

### Building for Production

**Build both:**
```bash
npm run build
```

**Build individually:**
```bash
npm run backend:build
npm run frontend:build
```

### Available Scripts

From the root directory:

- `npm run backend:dev` - Start backend development server
- `npm run backend:build` - Build backend for production
- `npm run frontend:dev` - Start frontend development server
- `npm run frontend:build` - Build frontend for production
- `npm run build` - Build both backend and frontend
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Technology Stack

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## License

UNLICENSED
