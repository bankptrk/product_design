# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router pages, layouts, and route handlers.
- `src/components/`: Reusable React UI components and layouts.
- `src/context/`: React context providers for shared application state.
- `src/data/`: Static data, mock definitions, and local fixtures.
- `src/types/`: TypeScript interfaces and shared type declarations.
- `public/`: Static assets including icons, images, and fonts.

## Build, Test, and Development Commands
- `npm run dev`: Starts the Next.js local development server with Turbopack.
- `npm run build`: Builds the production bundle and runs TypeScript type checking.
- `npm run start`: Starts the Next.js production server locally.
- `npm run lint`: Executes ESLint to verify code quality and style adherence.

## Coding Style & Naming Conventions
- **Language**: TypeScript (`strict: true`).
- **Styling**: Tailwind CSS v4 utility classes.
- **Indentation**: 2 spaces, no tabs.
- **File & Component Naming**:
  - Components and Types: `PascalCase` (e.g., `TaskBoard.tsx`, `Project.ts`).
  - Hooks, helpers, and utilities: `camelCase` (e.g., `useAuth.ts`, `formatDate.ts`).
  - Directories: `kebab-case` or Next.js route conventions (e.g., `(auth)`, `[id]`).

## Testing Guidelines
- Ensure code passes type checking (`npm run build`) and linting (`npm run lint`) prior to submitting.
- Place unit and integration tests adjacent to source files or inside `__tests__/` with `.test.ts` or `.spec.tsx` extensions.

## UI Flow Overview Synchronization (`/overview`)
Whenever you add a new page/route, modify an existing page's structure, or introduce new cross-page navigation links or modals, you **MUST** update the interactive React Flow architecture overview at `/overview` in the same change.

### Current Registered Routes
- `/` (`src/app/page.tsx`) — Home Storefront
- `/products` (`src/app/products/page.tsx`) — Product Catalog & Search
- `/products/[id]` (`src/app/products/[id]/page.tsx`) — Dynamic Product Detail Page
- `/design` (`src/app/design/page.tsx`) — Design System & Tokens (`DESIGN.md` Spec)
- `/overview` (`src/app/overview/page.tsx`) — UI Flow & Sitemap Overview (React Flow Canvas)

### Mandatory Checklist When Adding or Updating Pages
1. **Update Route & Link Metadata (`src/data/uiFlowData.ts`)**:
   - Add or update the page definition in `PROJECT_PAGES` (including `id`, `route`, `sampleHref`, `title`, `subtitle`, `filePath`, `routeType`, `queryParams`, `components`, `modals`, `sections`, and `stats`).
   - Register all new incoming and outgoing navigation triggers in `PAGE_FLOW_LINKS` (`sourcePageId`, `targetPageId`, `triggerComponent`, `triggerLabel`, `targetHref`, `category`, and `description`) and recalculate `incomingCount` / `outgoingCount` on affected pages.
2. **Update UI Page Node Wireframe (`src/components/UIPageNode.tsx`)**:
   - Add or update the route's miniature visual layout preview in `MiniPageWireframe` so the `<UIPageNode />` card accurately reflects the page UI on the React Flow canvas.
3. **Update React Flow Canvas Layout & Edges (`src/app/overview/page.tsx`)**:
   - Add node canvas coordinates `(x, y)` in `buildInitialNodes` and register the node accent color in `<MiniMap nodeColor={...} />`.
   - Connect directional `<UIFlowEdge />` definitions in `buildInitialEdges` using the appropriate handles (`top`, `bottom`, `left`, `right`) and `FlowCategory` (`shopping`, `breadcrumb`, `global-nav`, `self-dynamic`, or `system`).
   - If new shared global providers or `<Dialog />` modal overlays are added, update `sharedNodes` in `buildInitialNodes`.

## Commit & Pull Request Guidelines
- **Commit Messages**: Follow Conventional Commits format with concise, imperative descriptions:
  - `feat: add project detail page`
  - `fix: resolve sidebar navigation toggle issue`
  - `refactor: extract status badge component`
- **Pull Requests**:
  - Provide a clear description of changes and link corresponding issues.
  - Include screenshots or screen recordings for all UI updates.
  - Verify that `npm run lint` and `npm run build` succeed before requesting review.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
