# ARI Event Assistant

## Overview

ARI (AI Event Assistant) is a web application that automates event guest communication, RSVP tracking, and event information management primarily via WhatsApp. The platform allows event organizers to upload guest lists and let an AI assistant handle all guest interactions, from sending invitations to answering questions and collecting RSVPs.

The application features a modern, playful single-page marketing website that demonstrates the product's capabilities through interactive components like an animated WhatsApp chat preview and a dashboard mockup.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight alternative to React Router. The application currently supports a single-page home route and a 404 fallback.

**UI Component Library**: Shadcn UI (New York style variant) with Radix UI primitives for accessible, customizable components. The design system uses Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes.

**Design System**: 
- Typography hierarchy using system fonts (Inter for body, Merriweather for headlines)
- Spacing based on Tailwind's 4px unit system
- Custom color tokens defined via CSS variables (HSL color space)
- Hover and active state utilities (`hover-elevate`, `active-elevate-2`) for consistent interaction feedback
- Border radius customizations (9px/6px/3px instead of Tailwind defaults)

**State Management**: React Query (TanStack Query v5) for server state management, form state handled by React Hook Form with Zod validation.

**Component Structure**:
- Reusable presentational components (ProblemCard, SolutionStep, WhatsAppChat, DashboardPreview)
- Feature components (BookDemoModal, Navigation)
- Full Shadcn UI component library for consistent design primitives

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript in ESM mode.

**API Design**: RESTful JSON API with two main endpoints:
- `POST /api/demo-requests` - Create demo request submissions
- `GET /api/demo-requests` - Retrieve all demo requests

**Data Validation**: Zod schemas shared between client and server for type-safe request validation (via `drizzle-zod` integration).

**Development Setup**: Custom Vite middleware integration for HMR (Hot Module Replacement) in development, with production build serving static assets from Express.

**Storage Layer**: In-memory storage implementation (`MemStorage`) using Map data structures. The architecture uses an `IStorage` interface to allow future migration to persistent database solutions without changing business logic.

### Data Storage

**Database Schema**: PostgreSQL schema defined using Drizzle ORM with two tables:
- `users` table: Basic authentication structure (id, username, password)
- `demo_requests` table: Contact form submissions with event details (id, name, email, phone, eventType, message, createdAt)

**ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless driver. Schema uses UUID primary keys generated via `gen_random_uuid()`.

**Migration Strategy**: Drizzle Kit configured to output migrations to `./migrations` directory, with schema definitions in `shared/schema.ts` for type sharing across application layers.

**Current State**: Application uses in-memory storage in production. Database configuration exists but persistent storage is not yet implemented (DATABASE_URL required but storage layer uses Map-based memory storage).

### Authentication

**Current Implementation**: Schema includes user authentication table structure but no authentication middleware or routes are implemented. The application is currently open-access with no user sessions or protected routes.

## External Dependencies

### Core Framework Dependencies
- **Vite**: Frontend build tool and development server with React plugin
- **Express.js**: Backend HTTP server framework
- **React 18**: UI framework with TypeScript support
- **Wouter**: Lightweight client-side routing

### UI Component Libraries
- **Radix UI**: Headless component primitives (20+ components including Dialog, Dropdown, Popover, etc.)
- **Shadcn UI**: Pre-styled component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Lucide React**: Icon library for consistent iconography

### Database & Validation
- **Drizzle ORM**: Type-safe PostgreSQL ORM with schema generation
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **Zod**: Schema validation library for runtime type checking
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation

### State Management & Data Fetching
- **TanStack Query (React Query)**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **@hookform/resolvers**: Resolver integrations for validation libraries

### Development Tools
- **TypeScript**: Static type checking across full stack
- **ESBuild**: JavaScript bundler for production server builds
- **TSX**: TypeScript execution for development server
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicators

### Styling Dependencies
- **class-variance-authority**: Variant-based component styling utility
- **clsx**: Conditional className utility
- **tailwind-merge**: Tailwind class merging utility
- **date-fns**: Date formatting and manipulation

### Notable Design Decisions
- **Monorepo Structure**: Shared types and schemas in `shared/` directory accessible to both client and server
- **Path Aliases**: TypeScript path mapping for clean imports (`@/*`, `@shared/*`, `@assets/*`)
- **CSS Variable Theming**: Design tokens defined as CSS custom properties for runtime theme switching
- **Component Examples**: Separate example files in `client/src/components/examples/` for component documentation