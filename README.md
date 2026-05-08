# pulse-remote-desktop

Control your Linux PC's audio from a dedicated desktop window.

Electron wrapper for [pulse-remote-web](https://github.com/undg/pulse-remote-web) — a remote audio controller for PulseAudio/PipeWire.

## Features

- Standalone floating window for audio control
- Always on top — works with tiling window managers
- Skips taskbar — stays out of your way
- Clean, menu-free interface

## Quick Start

### 1. Set up the backend

Download [pulse-remote](https://github.com/undg/pulse-remote/releases/latest) for your architecture:

```bash
# Extract and run
tar xzf pulse-remote_*_Linux_x86_64.tar.gz
./pulse-remote
```

Server starts on `ws://localhost:8448/api/v1/ws`

Arch users can install from AUR:

```bash
yay -S pulse-remote-git
```

### 2. Install the desktop app

Download from [releases](https://github.com/undg/pulse-remote-desktop/releases/latest):

| Format        | File                              |
| ------------- | --------------------------------- |
| AppImage      | `pulse-remote-desktop-*.AppImage`   |
| Debian/Ubuntu | `pulse-remote-desktop_*_amd64.deb`  |
| RHEL/Fedora   | `pulse-remote-desktop-*.x86_64.rpm` |

Arch users can install from AUR:

```bash
yay -S pulse-remote-desktop
```

### 3. Run

Launch the app — it connects to the backend automatically.

## Configuration

The app connects to `http://localhost:8448` by default and runs as a 900×1200 floating toolbar window.

To change the server URL, window size, or behavior, edit `src/main/index.ts` and rebuild. See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions.

> **Note:** User-friendly configuration (settings file/CLI flags) is planned for a future release.

## Related Projects

- [pulse-remote](https://github.com/undg/pulse-remote) — Go backend (WebSocket ↔ PulseAudio/PipeWire)
- [pulse-remote-web](https://github.com/undg/pulse-remote-web) — React frontend (loaded by this app)
- [pulse-remote-mobile](https://github.com/undg/pulse-remote-mobile) — Mobile client

## License

MIT
