# Akademus - Monorepo Instructions

This is a monorepo containing a full-stack application with the following structure:

## Architecture Overview

```
akademus/
├── apps/
│   ├── api/          # NestJS backend with Prisma ORM
│   └── web/          # React frontend with TypeScript
├── .github/
│   └── instructions/ # Scoped Copilot instructions
└── turbo.json       # Turborepo configuration
```

## Project Context

**Akademus** is a full-stack TypeScript application built with:

- **Backend**: NestJS + Prisma + PostgreSQL
- **Frontend**: React 19+ + TypeScript + Tailwind CSS + Shadcn/ui
- **Build System**: Turborepo for monorepo management
- **Package Manager**: npm

## Scoped Instructions

This monorepo uses scoped Copilot instructions:

- **Backend (`apps/api/**/\*`)**: Use `backend.instructions.md` for NestJS/Prisma patterns
- **Frontend (`apps/web/**/\*`)**: Use `frontend.instructions.md` for React/TypeScript patterns

When working on files in either app, GitHub Copilot will automatically apply the relevant scoped instructions.

## Development Workflow

1. **Root Level**: Use for monorepo configuration, shared tooling, and documentation
2. **apps/api**: Follow NestJS conventions with Prisma ORM patterns
3. **apps/web**: Follow React + TypeScript conventions with Shadcn/ui components

## Cross-App Communication

The frontend communicates with the backend via REST API:

- API base URL configured in frontend services
- Shared TypeScript types should be considered for API contracts
- Authentication handled via JWT tokens

## Common Patterns

- Use TypeScript throughout the entire stack
- Follow consistent naming conventions between frontend and backend
- Implement proper error handling and validation on both sides
- Use environment variables for configuration
