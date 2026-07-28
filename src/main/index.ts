import { app, BrowserWindow, Tray, Menu, nativeImage } from "electron"
import icon from "../../resources/icon.png?asset"

// ── Performance ────────────────────────────────────────────────
app.commandLine.appendSwitch("disable-font-subpixel-positioning")
app.commandLine.appendSwitch("disable-software-rasterizer")
Menu.setApplicationMenu(null)
app.setName("pulse-remote-desktop")

// ── Single-instance toggle ────────────────────────────────────
// A second launch (e.g. Win+A while already running) triggers
// the existing instance instead of starting a new process.
let mainWindow: BrowserWindow | null = null
let isQuitting = false

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  // app.quit() is async — the event loop keeps running and Electron
  // initializes enough DBus/SNI internals for the DE to flash a tray icon.
  // app.exit() terminates immediately without any cleanup.
  app.exit(0)
} else {
  app.on("second-instance", () => {
    if (!mainWindow) return
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })
}

// ── Window ────────────────────────────────────────────────────
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 1200,
    show: false,
    backgroundColor: "#0b0a09", // matches --background dark theme (HSL 20 14.3% 4.1%)
    autoHideMenuBar: true,
    frame: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    type: "toolbar",
    resizable: true,
    minimizable: true,
    maximizable: true,
    icon,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show()
  })

  // Hide instead of close — the app stays alive for instant toggle
  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault()
      mainWindow?.hide()
    }
  })

  mainWindow.loadURL("http://localhost:8448").catch((err) => {
    console.error("Failed to load URL:", err)
  })
}

// ── Tray ──────────────────────────────────────────────────────
let tray: Tray | null = null

function createTray(): void {
  if (tray) return // already created — idempotent
  try {
    const trayIcon = nativeImage.createFromPath(icon as string).resize({ width: 16, height: 16 })
    tray = new Tray(trayIcon)
    tray.setToolTip("Pulse Remote")
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: "Show/Hide",
          click: () => {
            if (mainWindow?.isVisible()) {
              mainWindow?.hide()
            } else {
              mainWindow?.show()
              mainWindow?.focus()
            }
          },
        },
        { type: "separator" },
        {
          label: "Quit",
          click: () => {
            isQuitting = true
            app.quit()
          },
        },
      ]),
    )
  } catch {
    // Tray not available on this DE — app still works via launcher toggle
  }
}

// ── App lifecycle ─────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow()
  createTray()

  app.on("activate", () => {
    if (mainWindow) {
      mainWindow.show()
      mainWindow.focus()
    }
  })
})

app.on("before-quit", () => {
  isQuitting = true
})
