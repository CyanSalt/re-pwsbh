import { app, BrowserWindow, ipcMain } from 'electron'
import { initializeWindows } from './window'

function handleMessages() {
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
    )
  })
  ipcMain.on('toggle-visibility', (event, value: boolean) => {
    const frame = BrowserWindow.fromWebContents(event.sender)
    if (!frame) return
    if (value) {
      frame.show()
    } else {
      frame.hide()
    }
  })
  ipcMain.on('set-opacity', (event, value: number) => {
    const frame = BrowserWindow.fromWebContents(event.sender)
    if (!frame) return
    frame.setOpacity(value)
  })
  ipcMain.on('log', (event, value: unknown) => {
    console.log(value)
  })
}

async function initialize() {
  await app.whenReady()
  initializeWindows()
}

handleMessages()
initialize()

app.on('window-all-closed', () => {
  app.quit()
})
