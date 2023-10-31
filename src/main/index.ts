import * as path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { app, BrowserWindow, ipcMain, screen } from 'electron'

function createWindow(args: string[], options?: Partial<BrowserWindowConstructorOptions>) {
  const frame = new BrowserWindow({
    ...options,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/index.js'),
      additionalArguments: ['--', ...args],
    },
  })
  frame.loadFile(path.resolve(__dirname, '../renderer/index.html'))
  return frame
}

function createMainFrame() {
  return createWindow(['main-frame'])
}

function broadcast(event: string, ...args: any[]) {
  BrowserWindow.getAllWindows().forEach(frame => {
    frame.webContents.send(event, ...args)
  })
}

function handleMessages() {
  let backgroundFrame: BrowserWindow | undefined
  ipcMain.on('sync-time', (event, time: number) => {
    if (time > 0 && !backgroundFrame) {
      const display = screen.getPrimaryDisplay()
      backgroundFrame = createWindow(['background-frame'], {
        width: display.workAreaSize.width / 2,
        height: display.workAreaSize.height / 2,
      })
    }
    broadcast('time-update', time)
  })
}

async function initialize() {
  await app.whenReady()
  createMainFrame()
}

handleMessages()
initialize()

app.on('activate', (event, hasVisibleWindows) => {
  if (!hasVisibleWindows && app.isReady()) {
    createMainFrame()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
