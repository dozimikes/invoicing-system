# Invoicing System

A professional full-stack invoicing system designed for seamless client and invoice management, tailored for the Nigerian market with Naira (₦) currency support.

**Author:** [Chukwuedozie Chineke](https://github.com/dozimikes)

## Features

- **User Authentication**: Secure JWT-based login and registration system.
- **Client Management**: 
  - Create and track client profiles.
  - Improved error handling for duplicate email constraints.
  - Quick access to client billing history.
- **Invoice Management**:
  - Professional invoice generation with unique IDs.
  - **Naira (₦) Currency Support**: Fully local currency integration across all screens.
  - **Dynamic Status Tracking**: Transition invoices through DRAFT, SENT, PAID, and CANCELLED states.
  - **Professional Summary**: Modern, professional modal view for detailed invoice summaries.
  - **Print to PDF**: Generate clean, professional PDF documents directly from the browser with specialized print-only styles.
- **Dashboard**: Real-time business insights including Total Revenue (₦), Pending Invoices, and Active Client counts.

## Project Structure

```
invoicing-system/
├── backend/          # NestJS backend API
│   ├── src/          # Backend source code
│   ├── prisma/       # Database schema (MySQL)
│   └── test/         # Backend tests
├── frontend/         # Next.js frontend application (App Router)
│   └── src/          # Frontend source code
└── package.json      # Monorepo scripts
```

## Technology Stack

**Backend:**
- **NestJS**: Scalable server-side framework.
- **Prisma ORM**: Modern database access layer.
- **MySQL**: Relational database for data persistence.
- **JWT / Passport**: Secure authentication strategy.

**Frontend:**
- **Next.js 15**: Modern React framework with App Router.
- **React 19**: Interactive user interface components.
- **TypeScript**: Static typing for robust code.
- **Tailwind CSS**: Utility-first styling for premium design aesthetics.

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher.
- **MySQL**: Running instance (v8.0+ recommended).

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
   - Configure `.env` in the root and backend directories with your `DATABASE_URL` (MySQL) and `JWT_SECRET`.

4. **Initialize Database:**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

### Running Locally

Run backend and frontend in separate terminals:

**Backend (Port 3000):**
```bash
cd backend
npm run start:dev
```

**Frontend (Port 3001):**
```bash
cd frontend
npm run dev
```

## Building for Production

**Build all:**
```bash
npm run build
```

## License

UNLICENSED
