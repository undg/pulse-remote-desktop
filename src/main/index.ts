import { app, BrowserWindow } from 'electron'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 1200,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {})
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
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
