---
applyTo: 'apps/web/**/*'
---

# Copilot Instructions - Frontend (React/TypeScript)

You are helping with the frontend React application in the `apps/web` directory. Follow these patterns and conventions:

## Technology Stack

- React 19+ with TypeScript
- React Router v6 for routing
- Shadcn/ui components with Tailwind CSS
- Axios + React Query (TanStack Query) for data fetching
- React Hook Form + Zod for forms and validation
- Cypress for E2E testing

## Folder Structure

```
apps/web/src/
├── components/          # Reusable components
│   ├── ui/             # Shadcn base components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── common/         # Common reusable components
├── pages/              # Application pages
├── services/           # API services layer
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── providers/          # Context providers
└── assets/             # Static files
```

## Code Patterns

### Services Layer

- One file per entity/domain (e.g., `user-service.ts`, `product-service.ts`)
- Use factory pattern for Axios instances
- Naming: English verbs + entity (e.g., `getUserById`, `createProduct`)
- Export React Query hooks alongside service functions
- Example structure:

```typescript
export const userService = {
  getUsers: (): Promise<User[]> => api.get('/users').then(r => r.data),
  getUserById: (id: string): Promise<User> => api.get(`/users/${id}`).then(r => r.data),
};

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });
```

### Pages

- One folder per main page with `index.tsx` as entry point
- Page-specific components in same folder
- Use custom hooks for complex logic
- Handle loading, error, and success states
- Structure: `pages/page-name/index.tsx`

### Components

- PascalCase naming for component exports with descriptive prefixes (e.g., `UserCard`, `ProductForm`)
- kebab-case for file names (e.g., `user-card.tsx`, `product-form.tsx`)
- Use suffixes for type: `Button`, `Modal`, `Form`, `List`, `Card`
- Categories:
  - `ui/` - Base Shadcn components, no business logic
    - IMPORTANT: When creating a component use shadcn CLI to generate the component and its styles.
  - `forms/` - Form components with React Hook Form + Zod
  - `layout/` - Header, Footer, Sidebar, page layouts
  - `common/` - Reusable components with specific logic

## Naming Conventions

### Files

- `kebab-case` for all files and folders
- `.tsx` extension for components with JSX
- `.ts` extension for utilities and types
- Examples:
  - `user-service.ts` (service files)
  - `user-card.tsx` (component files)
  - `api-client.ts` (utility files)
  - `user-types.ts` (type definition files)

### Variables and Functions

- `camelCase` for variables and functions
- `UPPER_SNAKE_CASE` for constants
- Prefixes: `is`, `has`, `can` for booleans
- Prefixes: `handle` for event handlers

### Components

- Always use named exports
- One component per file
- Props interface with `Props` suffix

## TypeScript Patterns

- Use `interface` for object shapes
- Use `type` for unions, intersections, and computed types
- Always type component props
- Use `as const` for readonly arrays and objects

## React Query Patterns

- Group queries by entity
- Use consistent query keys
- Configure appropriate `staleTime` and `cacheTime`
- Use `enabled` for conditional queries
- Implement error boundaries

## Styling (Tailwind + Shadcn)

- Prefer Tailwind classes
- Use Shadcn components as base
- Create variants using cva (class-variance-authority)
- Maintain design system consistency

## Testing (Cypress)

- One test file per feature
- Use `data-testid` for selectors
- Implement page objects for reusability
- Test critical end-to-end flows

## Performance Guidelines

- Use `React.memo` for heavy components
- Implement lazy loading with `React.lazy`
- Optimize re-renders with `useCallback` and `useMemo`
- Code splitting by route
- Lazy loading for heavy components
