import * as path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { app, BrowserWindow, ipcMain } from 'electron'

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
  let jumpingYukiFrame: BrowserWindow | undefined
  ipcMain.on('sync-time', (event, time: number) => {
    const FPS = 46.46 // TODO: wtf?
    const frame = time * 1000 / FPS
    if (frame > 0 && !backgroundFrame) {
      backgroundFrame = createWindow(['background-frame'], {
        title: '背景呐',
        width: 1104,
        height: 537,
        center: true,
      })
    }
    if (frame > 9 && !jumpingYukiFrame) {
      jumpingYukiFrame = createWindow(['jumping-yuki-frame'], {
        title: '小雪',
        width: 240,
        height: 578,
        center: true,
      })
    }
    broadcast('time-update', time)
  })
  ipcMain.on('get-position', event => {
    const frame = BrowserWindow.fromWebContents(event.sender)
    if (!frame) return
    const [x, y] = frame.getPosition()
    event.returnValue = { x, y }
  })
  ipcMain.on('move-to', (event, position: { x?: number, y?: number }) => {
    const frame = BrowserWindow.fromWebContents(event.sender)
    if (!frame) return
    const [originalX, originalY] = frame.getPosition()
    frame.setPosition(
      Math.round(position.x ?? originalX),
      Math.round(position.y ?? originalY),
      true,
    )
  })
  ipcMain.on('set-opacity', (event, value: number) => {
    const frame = BrowserWindow.fromWebContents(event.sender)
    if (!frame) return
    frame.setOpacity(value)
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
