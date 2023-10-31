import * as path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { app, BrowserWindow, ipcMain, screen } from 'electron'

function broadcast(event: string, ...args: any[]) {
  BrowserWindow.getAllWindows().forEach(frame => {
    frame.webContents.send(event, ...args)
  })
}

function createWindow(args: string[], options?: Partial<BrowserWindowConstructorOptions>) {
  const frame = new BrowserWindow({
    ...options,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/index.js'),
      additionalArguments: ['--', ...args],
      backgroundThrottling: false,
    },
  })
  frame.loadFile(path.resolve(__dirname, '../renderer/index.html'))
  return frame
}

function createMainFrame() {
  return createWindow(['main-frame'])
}

function createWalkingDogFrame(
  originalFrame: BrowserWindow | undefined,
  mainFrame: BrowserWindow,
  offsetX: number,
) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 152,
    height: 126,
  }
  if (originalFrame) {
    originalFrame.setPosition(
      (screenSize.width - windowSize.width) / 2 + offsetX,
      (screenSize.height - windowSize.height) / 2 + 200,
    )
    originalFrame.show()
    return originalFrame
  } else {
    return createWindow(['walking-dog-frame'], {
      title: '勾',
      ...windowSize,
      x: (screenSize.width - windowSize.width) / 2 + offsetX,
      y: (screenSize.height - windowSize.height) / 2 + 200,
      focusable: false,
    })
  }
}

function handleMessages() {
  // The larger this value is, the slower the background will be played
  const FPS = 46.5 // TODO: wtf?
  let backgroundFrame: BrowserWindow | undefined
  let jumpingYukiFrame: BrowserWindow | undefined
  let walkingDogLeftOutsideFrame: BrowserWindow | undefined
  let walkingDogLeftMiddleFrame: BrowserWindow | undefined
  let walkingDogLeftInsideFrame: BrowserWindow | undefined
  let walkingDogRightInsideFrame: BrowserWindow | undefined
  let walkingDogRightMiddleFrame: BrowserWindow | undefined
  let walkingDogRightOutsideFrame: BrowserWindow | undefined
  ipcMain.on('get-fps', event => {
    event.returnValue = FPS
  })
  ipcMain.on('sync-time', (event, time: number) => {
    const windowFrame = BrowserWindow.fromWebContents(event.sender)
    if (!windowFrame) return
    const frame = time * 1000 / FPS
    if (frame >= 0 && !backgroundFrame) {
      backgroundFrame = createWindow(['background-frame'], {
        title: '背景呐',
        width: 1104,
        height: 537,
        center: true,
        focusable: false,
      })
    }
    if (frame >= 9 && !jumpingYukiFrame) {
      jumpingYukiFrame = createWindow(['jumping-yuki-frame'], {
        title: '小雪',
        width: 240,
        height: 578,
        center: true,
        focusable: false,
      })
    }
    if (frame >= 2284) {
      if (walkingDogLeftOutsideFrame) {
        walkingDogLeftOutsideFrame.hide()
      }
      if (walkingDogLeftMiddleFrame) {
        walkingDogLeftMiddleFrame.hide()
      }
      if (walkingDogLeftInsideFrame) {
        walkingDogLeftInsideFrame.hide()
      }
      if (walkingDogRightInsideFrame) {
        walkingDogRightInsideFrame.hide()
      }
      if (walkingDogRightMiddleFrame) {
        walkingDogRightMiddleFrame.hide()
      }
      if (walkingDogRightOutsideFrame) {
        walkingDogRightOutsideFrame.hide()
      }
    } else if (frame >= 2217) {
      walkingDogLeftOutsideFrame = createWalkingDogFrame(walkingDogLeftOutsideFrame, windowFrame, -562)
      walkingDogRightOutsideFrame = createWalkingDogFrame(walkingDogRightOutsideFrame, windowFrame, 558)
    } else if (frame >= 2151) {
      walkingDogLeftOutsideFrame = createWalkingDogFrame(walkingDogLeftOutsideFrame, windowFrame, -450)
      walkingDogLeftMiddleFrame = createWalkingDogFrame(walkingDogLeftMiddleFrame, windowFrame, -338)
      walkingDogLeftInsideFrame = createWalkingDogFrame(walkingDogLeftInsideFrame, windowFrame, -226)
      walkingDogRightInsideFrame = createWalkingDogFrame(walkingDogRightInsideFrame, windowFrame, 222)
      walkingDogRightMiddleFrame = createWalkingDogFrame(walkingDogRightMiddleFrame, windowFrame, 334)
      walkingDogRightOutsideFrame = createWalkingDogFrame(walkingDogRightOutsideFrame, windowFrame, 446)
    } else if (frame >= 1979) {
      if (walkingDogLeftInsideFrame) {
        walkingDogLeftInsideFrame.hide()
      }
      if (walkingDogRightInsideFrame) {
        walkingDogRightInsideFrame.hide()
      }
    } else if (frame >= 1874) {
      walkingDogLeftInsideFrame = createWalkingDogFrame(walkingDogLeftInsideFrame, windowFrame, -225)
      walkingDogRightInsideFrame = createWalkingDogFrame(walkingDogRightInsideFrame, windowFrame, 225)
    } else if (frame >= 1527) {
      if (walkingDogLeftOutsideFrame) {
        walkingDogLeftOutsideFrame.hide()
      }
      if (walkingDogLeftInsideFrame) {
        walkingDogLeftInsideFrame.hide()
      }
      if (walkingDogRightInsideFrame) {
        walkingDogRightInsideFrame.hide()
      }
      if (walkingDogRightOutsideFrame) {
        walkingDogRightOutsideFrame.hide()
      }
    } else if (frame >= 1491) {
      walkingDogLeftOutsideFrame = createWalkingDogFrame(walkingDogLeftOutsideFrame, windowFrame, -450)
      walkingDogLeftInsideFrame = createWalkingDogFrame(walkingDogLeftInsideFrame, windowFrame, -225)
      walkingDogRightInsideFrame = createWalkingDogFrame(walkingDogRightInsideFrame, windowFrame, 225)
      walkingDogRightOutsideFrame = createWalkingDogFrame(walkingDogRightOutsideFrame, windowFrame, 450)
    } else if (frame >= 1388) {
      if (walkingDogLeftOutsideFrame) {
        walkingDogLeftOutsideFrame.hide()
      }
      if (walkingDogRightOutsideFrame) {
        walkingDogRightOutsideFrame.hide()
      }
    } else if (frame >= 1371) {
      if (walkingDogLeftInsideFrame) {
        walkingDogLeftInsideFrame.hide()
      }
      if (walkingDogRightInsideFrame) {
        walkingDogRightInsideFrame.hide()
      }
    } else if (frame >= 1228) {
      walkingDogLeftOutsideFrame = createWalkingDogFrame(walkingDogLeftOutsideFrame, windowFrame, -450)
      walkingDogLeftInsideFrame = createWalkingDogFrame(walkingDogLeftInsideFrame, windowFrame, -225)
      walkingDogRightInsideFrame = createWalkingDogFrame(walkingDogRightInsideFrame, windowFrame, 225)
      walkingDogRightOutsideFrame = createWalkingDogFrame(walkingDogRightOutsideFrame, windowFrame, 450)
    } else if (frame >= 309) {
      if (walkingDogLeftOutsideFrame) {
        walkingDogLeftOutsideFrame.hide()
      }
      if (walkingDogLeftInsideFrame) {
        walkingDogLeftInsideFrame.hide()
      }
      if (walkingDogLeftMiddleFrame) {
        walkingDogLeftMiddleFrame.hide()
      }
      if (walkingDogRightInsideFrame) {
        walkingDogRightInsideFrame.hide()
      }
      if (walkingDogRightOutsideFrame) {
        walkingDogRightOutsideFrame.hide()
      }
    } else if (frame >= 272) {
      walkingDogLeftOutsideFrame = createWalkingDogFrame(walkingDogLeftOutsideFrame, windowFrame, -450)
      walkingDogLeftInsideFrame = createWalkingDogFrame(walkingDogLeftInsideFrame, windowFrame, -225)
      walkingDogLeftMiddleFrame = createWalkingDogFrame(walkingDogLeftMiddleFrame, windowFrame, 0)
      walkingDogRightInsideFrame = createWalkingDogFrame(walkingDogRightInsideFrame, windowFrame, 225)
      walkingDogRightOutsideFrame = createWalkingDogFrame(walkingDogRightOutsideFrame, windowFrame, 450)
    } else if (frame >= 152) {
      if (walkingDogLeftOutsideFrame) {
        walkingDogLeftOutsideFrame.hide()
      }
      if (walkingDogRightOutsideFrame) {
        walkingDogRightOutsideFrame.hide()
      }
    } else if (frame >= 14) {
      walkingDogLeftOutsideFrame = createWalkingDogFrame(walkingDogLeftOutsideFrame, windowFrame, -450)
      walkingDogRightOutsideFrame = createWalkingDogFrame(walkingDogRightOutsideFrame, windowFrame, 450)
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
  ipcMain.on('toggle-visibility', (event, value: boolean) => {
    const frame = BrowserWindow.fromWebContents(event.sender)
    if (!frame) return
    if (value) {
      frame.show()
    } else {
      frame.hide()
    }
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
