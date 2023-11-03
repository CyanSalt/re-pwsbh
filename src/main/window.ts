import { EventEmitter } from 'node:events'
import * as path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow, ipcMain, screen } from 'electron'
import raf from 'raf'

// The larger this value is, the slower the background will be played
const frameInterval = 30 + 50 / 3 // TODO: wtf?

function broadcast(event: string, ...args: any[]) {
  BrowserWindow.getAllWindows().forEach(frame => {
    frame.webContents.send(event, ...args)
  })
}

function createWindow(name: string, options?: Partial<BrowserWindowConstructorOptions>, params?: unknown) {
  let x = options?.x
  let y = options?.y
  let width = options?.width ?? 800
  let height = options?.height ?? 600
  if (options?.parent) {
    const screenSize = screen.getDisplayMatching(options.parent.getBounds()).workAreaSize
    if (!x) {
      x = Math.round((screenSize.width - width) / 2)
    }
    if (!y) {
      y = Math.round((screenSize.height - height) / 2)
    }
  }
  const frame = new BrowserWindow({
    useContentSize: true,
    show: false,
    ...options,
    width,
    height,
    x,
    y,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/index.js'),
      additionalArguments: ['--', JSON.stringify({
        name,
        params,
        initialPosition: { x: x ?? 0, y: y ?? 0 },
        initialSize: { width, height },
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
  const [width, height] = frame.getContentSize()
  const windowSize = { width, height }
  frame.setPosition(
    Math.round((screenSize.width - windowSize.width) / 2) + offsetX,
    Math.round((screenSize.height - windowSize.height) / 2) + 200,
  )
  frame.show()
}

function createMainFrame() {
  return createWindow('main-frame', {
    width: 312,
    height: 144,
  })
}

function createBackgroundFrame(mainFrame: BrowserWindow) {
  return createWindow('background-frame', {
    parent: mainFrame,
    title: '背景呐',
    width: 1104,
    height: 537,
    focusable: false,
  })
}

function createJumpingYukiFrame(mainFrame: BrowserWindow) {
  return createWindow('jumping-yuki-frame', {
    parent: mainFrame,
    title: '小雪',
    width: 240,
    height: 578,
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
    x: Math.round((screenSize.width - windowSize.width) / 2),
    y: Math.round((screenSize.height - windowSize.height) / 2) + 200,
    focusable: false,
  })
}

function createRollingDogFrame(mainFrame: BrowserWindow, keyframes: number[]) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 228,
    height: 188,
  }
  return createWindow('rolling-dog-frame', {
    parent: mainFrame,
    title: '勾',
    ...windowSize,
    x: Math.round((screenSize.width - windowSize.width) / 2) - 300,
    y: screenSize.height - windowSize.height - 30,
    focusable: false,
  }, keyframes)
}

function createClappingYukiFrame(mainFrame: BrowserWindow) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  return createWindow('clapping-yuki-frame', {
    parent: mainFrame,
    title: '',
    width: 291,
    height: 302,
    x: screenSize.width,
    y: screenSize.height,
    focusable: false,
  })
}

function createPeekingPigeonFrame(mainFrame: BrowserWindow) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  return createWindow('peeking-pigeon-frame', {
    parent: mainFrame,
    title: '',
    width: 274,
    height: 242,
    x: 274,
    y: screenSize.height,
    focusable: false,
  })
}

function createStaticYukiFrame(mainFrame: BrowserWindow, offsetX: number) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 240,
    height: 578,
  }
  return createWindow('static-yuki-frame', {
    parent: mainFrame,
    title: 'Error',
    ...windowSize,
    x: Math.round((screenSize.width - windowSize.width) / 2) + offsetX,
    y: Math.round((screenSize.height - windowSize.height) / 2),
    focusable: false,
  })
}

function createBlackBirdFrame(mainFrame: BrowserWindow) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 262,
    height: 204,
  }
  return createWindow('black-bird-frame', {
    parent: mainFrame,
    title: '',
    ...windowSize,
    x: Math.round((screenSize.width - windowSize.width) / 2) - 500,
    y: Math.round(screenSize.height / 2) - windowSize.height + 400,
    focusable: false,
  })
}

function createWhiteBirdFrame(mainFrame: BrowserWindow) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 267,
    height: 406,
  }
  return createWindow('white-bird-frame', {
    parent: mainFrame,
    title: '',
    ...windowSize,
    x: Math.round((screenSize.width - windowSize.width) / 2) + 500,
    y: Math.round(screenSize.height / 2) - windowSize.height + 400,
    focusable: false,
  })
}

function createWalkingYukiFrame(mainFrame: BrowserWindow) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 279,
    height: 569,
  }
  return createWindow('walking-yuki-frame', {
    parent: mainFrame,
    title: '正在踱步...',
    ...windowSize,
    x: screenSize.width - windowSize.width,
    y: Math.round((screenSize.height - windowSize.height) / 2),
    focusable: false,
  })
}

function createStaticPigeonFrame(mainFrame: BrowserWindow, offsetX: number, params?: unknown) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 399,
    height: 346,
  }
  return createWindow('static-pigeon-frame', {
    parent: mainFrame,
    title: 'UP主',
    ...windowSize,
    x: Math.round((screenSize.width - windowSize.width) / 2) + offsetX,
    y: Math.round((screenSize.height - windowSize.height) / 2) + 100,
    focusable: false,
  }, params)
}

function createFightingFrame(mainFrame: BrowserWindow) {
  return createWindow('fighting-frame', {
    parent: mainFrame,
    title: '',
    width: 1189,
    height: 668,
    focusable: false,
  })
}

function createAhhhhFrame(mainFrame: BrowserWindow) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 254,
    height: 458,
  }
  return createWindow('ahhhh-frame', {
    parent: mainFrame,
    title: 'Ahhhh',
    ...windowSize,
    x: Math.round(screenSize.width / 2),
    y: Math.round((screenSize.height - windowSize.height) / 2) + 100,
    focusable: false,
  })
}

function createErrorFrame(mainFrame: BrowserWindow, index: number) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 394,
    height: 174,
  }
  return createWindow('error-frame', {
    parent: mainFrame,
    title: 'Error',
    ...windowSize,
    x: Math.round(screenSize.width / 2) - index * 40,
    y: Math.round((screenSize.height - windowSize.height) / 2) + index * 30,
    frame: false,
  })
}

function createWavingBirdFrame(mainFrame: BrowserWindow, params?: unknown) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 172,
    height: 159,
  }
  return createWindow('waving-bird-frame', {
    parent: mainFrame,
    title: '',
    ...windowSize,
    x: Math.round((screenSize.width - windowSize.width) / 2),
    y: Math.round((screenSize.height - windowSize.height) / 2) + 240,
    focusable: false,
  }, params)
}

function showWavingBirdFrame(
  frame: BrowserWindow,
  offsetX: number,
) {
  const mainFrame = frame.getParentWindow()
  if (!mainFrame) return
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const [width, height] = frame.getContentSize()
  const windowSize = { width, height }
  frame.setPosition(
    Math.round((screenSize.width - windowSize.width) / 2) + offsetX,
    Math.round((screenSize.height - windowSize.height) / 2) + 240,
  )
  frame.show()
}

function loop(fn: Parameters<typeof raf>[0]) {
  raf(timestamp => {
    fn(timestamp)
    loop(fn)
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
  const rollingDogRightOutsideFrame = createRollingDogFrame(mainFrame, [172, 811, 990, 1391, 1989, 2305, 2405])
  const rollingDogRightInsideFrame = createRollingDogFrame(mainFrame, [1395, 1993, 2309])
  const rollingDogLeftInsideFrame = createRollingDogFrame(mainFrame, [1997, 2313])
  const rollingDogLeftOutsideFrame = createRollingDogFrame(mainFrame, [2317])
  const clappingYukiFrame = createClappingYukiFrame(mainFrame)
  const peekingPigeonFrame = createPeekingPigeonFrame(mainFrame)
  const staticYukiLeftFrame = createStaticYukiFrame(mainFrame, -400)
  const staticYukiCenterFrame = createStaticYukiFrame(mainFrame, 0)
  const staticYukiRightFrame = createStaticYukiFrame(mainFrame, 400)
  const blackBirdFrame = createBlackBirdFrame(mainFrame)
  const whiteBirdFrame = createWhiteBirdFrame(mainFrame)
  const walkingYukiFrame = createWalkingYukiFrame(mainFrame)
  const staticPigeonLeftOutsideFrame = createStaticPigeonFrame(mainFrame, -450)
  const staticPigeonLeftInsideFrame = createStaticPigeonFrame(mainFrame, -150)
  const staticPigeonRightInsideFrame = createStaticPigeonFrame(mainFrame, 150)
  const staticPigeonRightOutsideFrame = createStaticPigeonFrame(mainFrame, 450, 'white')
  const fightingFrame = createFightingFrame(mainFrame)
  const ahhhhFrame = createAhhhhFrame(mainFrame)
  const wavingBirdLeftOutsideFrame = createWavingBirdFrame(mainFrame)
  const wavingBirdLeftMiddleFrame = createWavingBirdFrame(mainFrame)
  const wavingBirdLeftInsideFrame = createWavingBirdFrame(mainFrame)
  const wavingBirdCenterFrame = createWavingBirdFrame(mainFrame)
  const wavingBirdRightInsideFrame = createWavingBirdFrame(mainFrame, 'white')
  const wavingBirdRightMiddleFrame = createWavingBirdFrame(mainFrame, 'white')
  const wavingBirdRightOutsideFrame = createWavingBirdFrame(mainFrame, 'white')
  const errorFrames = Array.from({ length: 6 }, (_, index) => createErrorFrame(mainFrame, index))

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
    rollingDogRightOutsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-811', () => {
    rollingDogRightOutsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-990', () => {
    rollingDogRightOutsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-1391', () => {
    rollingDogRightOutsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-1395', () => {
    rollingDogRightInsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-1989', () => {
    rollingDogRightOutsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-1993', () => {
    rollingDogRightInsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-1997', () => {
    rollingDogLeftInsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-2305', () => {
    rollingDogRightOutsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-2309', () => {
    rollingDogRightInsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-2313', () => {
    rollingDogLeftInsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-2317', () => {
    rollingDogLeftOutsideFrame.show()
  })

  emitter.once('rolling-dog:keyframe-2405', () => {
    rollingDogRightOutsideFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-69', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-220', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-1288', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-1438', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-1512', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-1669', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-1896', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-2046', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-2198', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('clapping-yuki-peeking-pigeon:keyframe-2352', () => {
    clappingYukiFrame.show()
    peekingPigeonFrame.show()
  })

  emitter.once('static-yuki:keyframe-234', () => {
    staticYukiLeftFrame.show()
  })

  emitter.once('static-yuki:keyframe-244', () => {
    staticYukiCenterFrame.show()
  })

  emitter.once('static-yuki:keyframe-254', () => {
    staticYukiRightFrame.show()
  })

  emitter.once('static-yuki:keyframe-1452', () => {
    staticYukiLeftFrame.show()
  })

  emitter.once('static-yuki:keyframe-1462', () => {
    staticYukiCenterFrame.show()
  })

  emitter.once('static-yuki:keyframe-1472', () => {
    staticYukiRightFrame.show()
  })

  emitter.once('static-yuki:keyframe-2061', () => {
    staticYukiLeftFrame.show()
  })

  emitter.once('static-yuki:keyframe-2071', () => {
    staticYukiCenterFrame.show()
  })

  emitter.once('static-yuki:keyframe-2081', () => {
    staticYukiRightFrame.show()
  })

  emitter.once('static-yuki:keyframe-2368', () => {
    staticYukiLeftFrame.show()
  })

  emitter.once('static-yuki:keyframe-2378', () => {
    staticYukiCenterFrame.show()
  })

  emitter.once('static-yuki:keyframe-2388', () => {
    staticYukiRightFrame.show()
  })

  emitter.once('black-bird-white-bird:keyframe-315', () => {
    blackBirdFrame.show()
    whiteBirdFrame.show()
  })

  emitter.once('walking-yuki:keyframe-619', () => {
    walkingYukiFrame.show()
  })

  emitter.once('static-pigeon:keyframe-1149', () => {
    staticPigeonLeftOutsideFrame.show()
  })

  emitter.once('static-pigeon:keyframe-1158', () => {
    staticPigeonLeftInsideFrame.show()
  })

  emitter.once('static-pigeon:keyframe-1167', () => {
    staticPigeonRightInsideFrame.show()
  })

  emitter.once('static-pigeon:keyframe-1176', () => {
    staticPigeonRightOutsideFrame.show()
  })

  emitter.once('fighting:keyframe-1184', () => {
    fightingFrame.show()
  })

  emitter.once('ahhhh-error:keyframe-1212', () => {
    ahhhhFrame.show()
  })

  emitter.once('waving-bird:keyframe-1685', () => {
    showWavingBirdFrame(wavingBirdLeftOutsideFrame, -480)
    showWavingBirdFrame(wavingBirdLeftMiddleFrame, -320)
    showWavingBirdFrame(wavingBirdLeftInsideFrame, -160)
    showWavingBirdFrame(wavingBirdRightInsideFrame, 160)
    showWavingBirdFrame(wavingBirdRightMiddleFrame, 320)
    showWavingBirdFrame(wavingBirdRightOutsideFrame, 480)
  })

  emitter.once('waving-bird:keyframe-2099', () => {
    showWavingBirdFrame(wavingBirdRightInsideFrame, -300)
    showWavingBirdFrame(wavingBirdLeftOutsideFrame, -100)
    showWavingBirdFrame(wavingBirdRightOutsideFrame, 100)
    showWavingBirdFrame(wavingBirdLeftInsideFrame, 300)
  })

  emitter.once('waving-bird:keyframe-2439', () => {
    showWavingBirdFrame(wavingBirdLeftOutsideFrame, -360)
    showWavingBirdFrame(wavingBirdRightInsideFrame, -240)
    showWavingBirdFrame(wavingBirdLeftMiddleFrame, -120)
    showWavingBirdFrame(wavingBirdRightMiddleFrame, 0)
    showWavingBirdFrame(wavingBirdCenterFrame, 120)
    showWavingBirdFrame(wavingBirdRightOutsideFrame, 240)
    showWavingBirdFrame(wavingBirdLeftInsideFrame, 360)
  })

  const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

  emitter.once('ahhhh-error:keyframe-1214', async () => {
    for (const frame of errorFrames) {
      frame.show()
      await sleep(70)
    }
  })

  emitter.once('ahhhh-error:keyframe-1246', () => {
    errorFrames.forEach(frame => {
      frame.hide()
    })
  })

  let startedAt = -1

  ipcMain.on('sync-time', (event, time: number) => {
    startedAt = performance.now() - time * 1000
  })

  loop(timestamp => {
    if (startedAt < 0) return
    const frame = (timestamp - startedAt) / frameInterval
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
    if (frame >= 2405) {
      emitter.emit('rolling-dog:keyframe-2405')
    } else if (frame >= 2317) {
      emitter.emit('rolling-dog:keyframe-2317')
    } else if (frame >= 2313) {
      emitter.emit('rolling-dog:keyframe-2313')
    } else if (frame >= 2309) {
      emitter.emit('rolling-dog:keyframe-2309')
    } else if (frame >= 2305) {
      emitter.emit('rolling-dog:keyframe-2305')
    } else if (frame >= 1997) {
      emitter.emit('rolling-dog:keyframe-1997')
    } else if (frame >= 1993) {
      emitter.emit('rolling-dog:keyframe-1993')
    } else if (frame >= 1989) {
      emitter.emit('rolling-dog:keyframe-1989')
    } else if (frame >= 1395) {
      emitter.emit('rolling-dog:keyframe-1395')
    } else if (frame >= 1391) {
      emitter.emit('rolling-dog:keyframe-1391')
    } else if (frame >= 990) {
      emitter.emit('rolling-dog:keyframe-990')
    } else if (frame >= 811) {
      emitter.emit('rolling-dog:keyframe-811')
    } else if (frame >= 172) {
      emitter.emit('rolling-dog:keyframe-172')
    }
    // Clapping Yuki and Peeking pigeon
    if (frame >= 2352) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-2352')
    } else if (frame >= 2198) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-2198')
    } else if (frame >= 2046) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-2046')
    } else if (frame >= 1896) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-1896')
    } else if (frame >= 1669) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-1669')
    } else if (frame >= 1512) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-1512')
    } else if (frame >= 1438) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-1438')
    } else if (frame >= 1288) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-1288')
    } else if (frame >= 220) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-220')
    } else if (frame >= 69) {
      emitter.emit('clapping-yuki-peeking-pigeon:keyframe-69')
    }
    // Static Yuki
    if (frame >= 2388) {
      emitter.emit('static-yuki:keyframe-2081')
    } else if (frame >= 2378) {
      emitter.emit('static-yuki:keyframe-2071')
    } else if (frame >= 2368) {
      emitter.emit('static-yuki:keyframe-2061')
    } else if (frame >= 2081) {
      emitter.emit('static-yuki:keyframe-2081')
    } else if (frame >= 2071) {
      emitter.emit('static-yuki:keyframe-2071')
    } else if (frame >= 2061) {
      emitter.emit('static-yuki:keyframe-2061')
    } else if (frame >= 1472) {
      emitter.emit('static-yuki:keyframe-1472')
    } else if (frame >= 1462) {
      emitter.emit('static-yuki:keyframe-1462')
    } else if (frame >= 1452) {
      emitter.emit('static-yuki:keyframe-1452')
    } else if (frame >= 254) {
      emitter.emit('static-yuki:keyframe-254')
    } else if (frame >= 244) {
      emitter.emit('static-yuki:keyframe-244')
    } else if (frame >= 234) {
      emitter.emit('static-yuki:keyframe-234')
    }
    // Black bird and white bird
    if (frame >= 315) {
      emitter.emit('black-bird-white-bird:keyframe-315')
    }
    // Walking Yuki
    if (frame >= 619) {
      emitter.emit('walking-yuki:keyframe-619')
    }
    // Static pigeons
    if (frame >= 1176) {
      emitter.emit('static-pigeon:keyframe-1176')
    } else if (frame >= 1167) {
      emitter.emit('static-pigeon:keyframe-1167')
    } else if (frame >= 1158) {
      emitter.emit('static-pigeon:keyframe-1158')
    } else if (frame >= 1149) {
      emitter.emit('static-pigeon:keyframe-1149')
    }
    // Fighting
    if (frame >= 1184) {
      emitter.emit('fighting:keyframe-1184')
    }
    // Ahhhh and errors
    if (frame >= 1246) {
      emitter.emit('ahhhh-error:keyframe-1246')
    } else if (frame >= 1214) {
      emitter.emit('ahhhh-error:keyframe-1214')
    } else if (frame >= 1212) {
      emitter.emit('ahhhh-error:keyframe-1212')
    }
    // Waving birds
    if (frame >= 2439) {
      emitter.emit('waving-bird:keyframe-2439')
    } else if (frame >= 2099) {
      emitter.emit('waving-bird:keyframe-2099')
    } else if (frame >= 1685) {
      emitter.emit('waving-bird:keyframe-1685')
    }
    broadcast('play', frame, frameInterval)
  })
}
