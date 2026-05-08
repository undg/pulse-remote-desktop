# Contributing to pulse-remote-desktop

## Architecture

```
┌─────────────────────────┐
│  pulse-remote-desktop   │  ← This repo (Electron wrapper)
│   (Electron App)        │
└───────────┬─────────────┘
            │ WebSocket
            ↓
┌─────────────────────────┐
│   pulse-remote          │  ← Backend server (Go/WebSocket)
│   (localhost:8448)      │     https://github.com/undg/pulse-remote
└───────────┬─────────────┘
            │ PulseAudio API
            ↓
┌─────────────────────────┐
│  PulseAudio/PipeWire    │  ← Linux audio system
└─────────────────────────┘
```

## Prerequisites

- Node.js + pnpm
- [pulse-remote](https://github.com/undg/pulse-remote) server running on `ws://localhost:8448`

## Setup

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build          # Type check + production build
pnpm run build:linux    # Package for Linux
pnpm run build:unpack   # Build unpacked (testing)
```

## Configuration

Window behavior and server URL are in `src/main/index.ts`:
- Server URL (default: `http://localhost:8448`)
- Window size (default: 900×1200)
- Always on top, skip taskbar, WM_CLASS

## Dev Stack

- **Electron** + **electron-vite** — native wrapper + fast builds
- **TypeScript** — strict type checking
- **ESLint + Prettier** — linting and formatting

## Lint & Format

```bash
pnpm run lint
pnpm run format
pnpm run typecheck
```
