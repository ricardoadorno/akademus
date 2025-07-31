# Cortex Monorepo

A full-stack application built with NestJS (API) and React with Vite (Web Client), managed with Turbo.

## Project Structure

```
cortex/
├── apps/
│   ├── api/          # NestJS backend API
│   └── web/          # React frontend client
├── packages/         # Shared packages (future)
└── epics/           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL (for the database)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the `apps/api` directory
   - Configure your database connection and other environment variables

4. Set up the database:
   ```bash
   npm run db:generate
   npm run db:push
   ```

### Development

Start all applications in development mode:
```bash
npm run dev
```

Or start individual applications:
```bash
# Start API only
npm run api:dev

# Start Web client only
npm run web:dev
```

### Available Scripts

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps for production
- `npm run lint` - Run linting across all apps
- `npm run test` - Run tests across all apps
- `npm run clean` - Clean build outputs
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema changes
- `npm run db:migrate` - Run database migrations

## Applications

### API (NestJS)

Backend API built with NestJS, featuring:
- Authentication with JWT
- User management
- Prisma ORM for database operations
- OpenAPI/Swagger documentation

**Location:** `apps/api`
**Port:** 3000 (development)

### Web Client (React + Vite)

Frontend application built with:
- React 19
- Vite for fast development
- TailwindCSS for styling
- React Router for navigation
- React Query for API state management
- React Hook Form for form handling

**Location:** `apps/web`
**Port:** 5173 (development)

## Database

The project uses PostgreSQL with Prisma as the ORM. Database schema is defined in `apps/api/prisma/schema.prisma`.

## Architecture

- **Monorepo:** Managed with Turbo for efficient builds and caching
- **API:** RESTful API with NestJS following modular architecture
- **Client:** SPA with React using modern hooks and context patterns
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT-based authentication system

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm run test`
4. Run linting: `npm run lint`
5. Submit a pull request

## License

Private - All rights reserved
