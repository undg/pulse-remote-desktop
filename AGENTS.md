# Agent Guidelines for pulse-remote-desktop

## Build/Test Commands

- `npm run dev` - Start Electron app in development mode
- `npm run build` - Type check and build for production
- `npm run typecheck` - Run type checking for all TypeScript files
- `npm run typecheck:node` - Type check main/preload processes only
- `npm run typecheck:web` - Type check renderer process only
- `npm run lint` - Run ESLint with cache
- `npm run format` - Format code with Prettier
- No test framework configured currently

## Code Style

- **Formatting**: Single quotes, no semicolons, 100 char line width, trailing commas (see `.prettierrc.yaml`)
- **Indentation**: 2 spaces (enforced by `.editorconfig`)
- **TypeScript**: Strict type checking enabled, use explicit return types for functions
- **Imports**: Group by external deps, then internal modules; use ES6 imports
- **Error Handling**: Use try-catch blocks, log errors to console (see `src/preload/index.ts:15`)
- **Naming**: camelCase for variables/functions, PascalCase for classes/types
- **Comments**: Document complex logic and performance optimizations (see `src/main/index.ts:5-8`)

## Project Structure

- `src/main/` - Electron main process (Node.js)
- `src/preload/` - Preload scripts (context bridge)
- `src/renderer/` - Renderer process (web/browser)
