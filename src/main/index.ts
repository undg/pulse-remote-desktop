import { app, BrowserWindow } from 'electron'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 1200,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    type: 'toolbar', // Linux X11 window type - sets WM_WINDOW_ROLE
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
