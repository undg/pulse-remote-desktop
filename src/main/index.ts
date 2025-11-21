import { app, BrowserWindow } from 'electron'
import icon from '../../resources/icon.png?asset'

// Set the app name explicitly (used for WM_CLASS on Linux)
app.setName('pulse-remote-electron')

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 1200,
    show: false,
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
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Load localhost URL
  mainWindow.loadURL('http://localhost:8448')
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
