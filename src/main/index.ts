import { app, BrowserWindow } from 'electron'
import icon from '../../resources/icon.png?asset'
import { Menu } from 'electron/main'

// Performance optimizations - disable font preloading and unnecessary rendering features
app.commandLine.appendSwitch('disable-font-subpixel-positioning')
app.commandLine.appendSwitch('disable-software-rasterizer')
Menu.setApplicationMenu(null)

// Set the app name explicitly (used for WM_CLASS on Linux)
app.setName('pulse-remote-electron')

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 1200,
    show: true,
    autoHideMenuBar: true,
    frame: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    type: 'toolbar', // X11: sets WM_WINDOW_ROLE, helps tiling WMs float the window
    resizable: true,
    minimizable: true,
    maximizable: true,
    icon,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Load localhost URL with error handling
  mainWindow.loadURL('http://localhost:8448').catch((err) => {
    console.error('Failed to load URL:', err)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
