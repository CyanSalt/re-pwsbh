import * as path from 'node:path'
import { app, BrowserWindow } from 'electron'

function createWindow() {
  const frame = new BrowserWindow()
  frame.loadFile(path.resolve(__dirname, '../renderer/index.html'))
}

async function initialize() {
  await app.whenReady()
  createWindow()
}

initialize()

app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows && app.isReady()) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
