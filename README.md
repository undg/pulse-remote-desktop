# pulse-remote-desktop

Electron desktop wrapper for [pulse-remote-web](https://github.com/undg/pulse-remote-web) - a WebSocket-based remote PulseAudio/PipeWire controller for Linux systems.

## What is this?

This Electron app wraps the [pulse-remote-web](https://github.com/undg/pulse-remote-web) frontend in a native desktop window, providing a dedicated interface to control your Linux PC's audio remotely. It connects to the [pulse-remote](https://github.com/undg/pulse-remote) WebSocket server running on your Linux machine (default: `http://localhost:8448`).

## Features

- **Standalone Desktop App**: Native Electron window for the web interface
- **Always on Top**: Configured as a floating toolbar window (useful for tiling window managers)
- **Auto-hide Menu**: Clean, distraction-free interface
- **Skip Taskbar**: Appears as a utility window
- **Optimized for Linux**: Custom WM_CLASS and window type settings for tiling WMs

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

You need the [pulse-remote](https://github.com/undg/pulse-remote) server running on your Linux machine:

```bash
git clone https://github.com/undg/pulse-remote
cd pulse-remote
make run
```

The server will start on `ws://localhost:8448/api/v1/ws`

## Installation

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm run dev
```

### Build

```bash
# Type check and build for production
pnpm run build

# Build and package for Linux
pnpm run build:linux

# Build unpacked (for testing)
pnpm run build:unpack
```

## Configuration

The app is configured to:

- Load the web UI from `http://localhost:8448`
- Display as a 900x1200 floating toolbar window
- Stay always on top and skip the taskbar
- Use custom WM_CLASS: `pulse-remote-electron`

Edit `src/main/index.ts` to customize window behavior and server URL.

## Related Projects

- **[pulse-remote](https://github.com/undg/pulse-remote)**: Go backend WebSocket server that communicates with PulseAudio/PipeWire
- **[pulse-remote-web](https://github.com/undg/pulse-remote-web)**: React/TypeScript web frontend (loaded by this app)

## Development Stack

- **Electron**: Native desktop wrapper
- **TypeScript**: Type-safe development
- **Vite**: Fast build tooling via electron-vite
- **ESLint + Prettier**: Code quality and formatting

## License

MIT
