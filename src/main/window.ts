import { EventEmitter } from 'node:events'
import * as path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow, ipcMain, screen } from 'electron'

// The larger this value is, the slower the background will be played
const FPS = 46.5 // TODO: wtf?

function broadcast(event: string, ...args: any[]) {
  BrowserWindow.getAllWindows().forEach(frame => {
    frame.webContents.send(event, ...args)
  })
}

function createWindow(name: string, options?: Partial<BrowserWindowConstructorOptions>) {
  let x = options?.x
  let y = options?.y
  if (options?.parent) {
    const screenSize = screen.getDisplayMatching(options.parent.getBounds()).workAreaSize
    if (!x && options.width) {
      x = (screenSize.width - options.width) / 2
    }
    if (!y && options.height) {
      y = (screenSize.height - options.height) / 2
    }
  }
  const frame = new BrowserWindow({
    ...options,
    show: false,
    x,
    y,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/index.js'),
      additionalArguments: ['--', JSON.stringify({
        name,
        fps: FPS,
        initialPosition: { x: x ?? 0, y: y ?? 0 },
      })],
      backgroundThrottling: false,
    },
  })
  frame.loadFile(path.resolve(__dirname, '../renderer/index.html'))
  frame.on('show', () => {
    frame.webContents.send('show')
  })
  return frame
}

function showWalkingDogFrame(
  frame: BrowserWindow,
  offsetX: number,
) {
  const mainFrame = frame.getParentWindow()
  if (!mainFrame) return
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 152,
    height: 126,
  }
  frame.setPosition(
    (screenSize.width - windowSize.width) / 2 + offsetX,
    (screenSize.height - windowSize.height) / 2 + 200,
  )
  frame.show()
}

function createMainFrame() {
  return createWindow('main-frame')
}

function createBackgroundFrame(mainFrame: BrowserWindow) {
  return createWindow('background-frame', {
    parent: mainFrame,
    title: '背景呐',
    width: 1104,
    height: 537,
    show: false,
    focusable: false,
  })
}

function createJumpingYukiFrame(mainFrame: BrowserWindow) {
  return createWindow('jumping-yuki-frame', {
    parent: mainFrame,
    title: '小雪',
    width: 240,
    height: 578,
    show: false,
    focusable: false,
  })
}

function createWalkingDogFrame(mainFrame: BrowserWindow) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 152,
    height: 126,
  }
  return createWindow('walking-dog-frame', {
    parent: mainFrame,
    title: '勾',
    ...windowSize,
    x: (screenSize.width - windowSize.width) / 2,
    y: (screenSize.height - windowSize.height) / 2 + 200,
    show: false,
    focusable: false,
  })
}

function createRollingDogFrame(mainFrame: BrowserWindow) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 228,
    height: 188,
  }
  return createWindow('rolling-dog-frame', {
    parent: mainFrame,
    title: '勾',
    ...windowSize,
    x: (screenSize.width - windowSize.width) / 2 - 300,
    y: screenSize.height - windowSize.height - 30,
    show: false,
    focusable: false,
  })
}

export function initializeWindows() {
  const mainFrame = createMainFrame()
  const backgroundFrame = createBackgroundFrame(mainFrame)
  const jumpingYukiFrame = createJumpingYukiFrame(mainFrame)
  const walkingDogLeftOutsideFrame = createWalkingDogFrame(mainFrame)
  const walkingDogLeftMiddleFrame = createWalkingDogFrame(mainFrame)
  const walkingDogLeftInsideFrame = createWalkingDogFrame(mainFrame)
  const walkingDogRightInsideFrame = createWalkingDogFrame(mainFrame)
  const walkingDogRightMiddleFrame = createWalkingDogFrame(mainFrame)
  const walkingDogRightOutsideFrame = createWalkingDogFrame(mainFrame)
  const rollingDogFrame = createRollingDogFrame(mainFrame)

  const whenReady = Promise.all(
    BrowserWindow.getAllWindows().map(frame => new Promise<void>(resolve => {
      frame.once('ready-to-show', () => {
        resolve()
      })
    })),
  )

  whenReady.then(() => {
    mainFrame.show()
  })

  const emitter = new EventEmitter()

  emitter.once('background:keyframe-0', () => {
    backgroundFrame.show()
  })

  emitter.once('jumping-yuki:keyframe-9', () => {
    jumpingYukiFrame.show()
  })

  emitter.once('walking-dog:keyframe-14', () => {
    showWalkingDogFrame(walkingDogLeftOutsideFrame, -450)
    showWalkingDogFrame(walkingDogRightOutsideFrame, 450)
  })

  emitter.once('walking-dog:keyframe-152', () => {
    walkingDogLeftOutsideFrame.hide()
    walkingDogRightOutsideFrame.hide()
  })

  emitter.once('walking-dog:keyframe-272', () => {
    showWalkingDogFrame(walkingDogLeftOutsideFrame, -450)
    showWalkingDogFrame(walkingDogLeftInsideFrame, -225)
    showWalkingDogFrame(walkingDogLeftMiddleFrame, 0)
    showWalkingDogFrame(walkingDogRightInsideFrame, 225)
    showWalkingDogFrame(walkingDogRightOutsideFrame, 450)
  })

  emitter.once('walking-dog:keyframe-309', () => {
    walkingDogLeftOutsideFrame.hide()
    walkingDogLeftInsideFrame.hide()
    walkingDogLeftMiddleFrame.hide()
    walkingDogRightInsideFrame.hide()
    walkingDogRightOutsideFrame.hide()
  })

  emitter.once('walking-dog:keyframe-1228', () => {
    showWalkingDogFrame(walkingDogLeftOutsideFrame, -450)
    showWalkingDogFrame(walkingDogLeftInsideFrame, -225)
    showWalkingDogFrame(walkingDogRightInsideFrame, 225)
    showWalkingDogFrame(walkingDogRightOutsideFrame, 450)
  })

  emitter.once('walking-dog:keyframe-1371', () => {
    walkingDogLeftInsideFrame.hide()
    walkingDogRightInsideFrame.hide()
  })

  emitter.once('walking-dog:keyframe-1388', () => {
    walkingDogLeftOutsideFrame.hide()
    walkingDogRightOutsideFrame.hide()
  })

  emitter.once('walking-dog:keyframe-1491', () => {
    showWalkingDogFrame(walkingDogLeftOutsideFrame, -450)
    showWalkingDogFrame(walkingDogLeftInsideFrame, -225)
    showWalkingDogFrame(walkingDogRightInsideFrame, 225)
    showWalkingDogFrame(walkingDogRightOutsideFrame, 450)
  })

  emitter.once('walking-dog:keyframe-1527', () => {
    walkingDogLeftOutsideFrame.hide()
    walkingDogLeftInsideFrame.hide()
    walkingDogRightInsideFrame.hide()
    walkingDogRightOutsideFrame.hide()
  })

  emitter.once('walking-dog:keyframe-1874', () => {
    showWalkingDogFrame(walkingDogLeftInsideFrame, -225)
    showWalkingDogFrame(walkingDogRightInsideFrame, 225)
  })

  emitter.once('walking-dog:keyframe-1979', () => {
    walkingDogLeftInsideFrame.hide()
    walkingDogRightInsideFrame.hide()
  })

  emitter.once('walking-dog:keyframe-2151', () => {
    showWalkingDogFrame(walkingDogLeftOutsideFrame, -450)
    showWalkingDogFrame(walkingDogLeftMiddleFrame, -338)
    showWalkingDogFrame(walkingDogLeftInsideFrame, -226)
    showWalkingDogFrame(walkingDogRightInsideFrame, 222)
    showWalkingDogFrame(walkingDogRightMiddleFrame, 334)
    showWalkingDogFrame(walkingDogRightOutsideFrame, 446)
  })

  emitter.once('walking-dog:keyframe-2217', () => {
    showWalkingDogFrame(walkingDogLeftOutsideFrame, -562)
    showWalkingDogFrame(walkingDogRightOutsideFrame, 558)
  })

  emitter.once('walking-dog:keyframe-2284', () => {
    walkingDogLeftOutsideFrame.hide()
    walkingDogLeftMiddleFrame.hide()
    walkingDogLeftInsideFrame.hide()
    walkingDogRightInsideFrame.hide()
    walkingDogRightMiddleFrame.hide()
    walkingDogRightOutsideFrame.hide()
  })

  emitter.once('rolling-dog:keyframe-172', () => {
    rollingDogFrame.show()
  })

  ipcMain.on('sync-time', (event, time: number) => {
    const frame = time * 1000 / FPS
    // Background
    if (frame >= 0) {
      emitter.emit('background:keyframe-0')
    }
    // Jumping Yuki
    if (frame >= 9) {
      emitter.emit('jumping-yuki:keyframe-9')
    }
    // Walking dogs
    if (frame >= 2284) {
      emitter.emit('walking-dog:keyframe-2284')
    } else if (frame >= 2217) {
      emitter.emit('walking-dog:keyframe-2217')
    } else if (frame >= 2151) {
      emitter.emit('walking-dog:keyframe-2151')
    } else if (frame >= 1979) {
      emitter.emit('walking-dog:keyframe-1979')
    } else if (frame >= 1874) {
      emitter.emit('walking-dog:keyframe-1874')
    } else if (frame >= 1527) {
      emitter.emit('walking-dog:keyframe-1527')
    } else if (frame >= 1491) {
      emitter.emit('walking-dog:keyframe-1491')
    } else if (frame >= 1388) {
      emitter.emit('walking-dog:keyframe-1388')
    } else if (frame >= 1371) {
      emitter.emit('walking-dog:keyframe-1371')
    } else if (frame >= 1228) {
      emitter.emit('walking-dog:keyframe-1228')
    } else if (frame >= 309) {
      emitter.emit('walking-dog:keyframe-309')
    } else if (frame >= 272) {
      emitter.emit('walking-dog:keyframe-272')
    } else if (frame >= 152) {
      emitter.emit('walking-dog:keyframe-152')
    } else if (frame >= 14) {
      emitter.emit('walking-dog:keyframe-14')
    }
    // Rolling dog
    if (frame >= 172) {
      emitter.emit('rolling-dog:keyframe-172')
    }
    broadcast('time-update', time)
  })
}