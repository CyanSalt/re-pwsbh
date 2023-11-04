import { EventEmitter } from 'node:events'
import * as path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow, ipcMain, screen } from 'electron'
import raf from 'raf'

// The larger this value is, the slower the background text will be played
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
    focusable: false,
    backgroundColor: options?.frame === false ? undefined : '#fed851',
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
    title: '背景呐',
    width: 1104,
    height: 537,
    focusable: true,
  })
}

function createJumpingYukiFrame(mainFrame: BrowserWindow) {
  return createWindow('jumping-yuki-frame', {
    parent: mainFrame,
    title: '小雪',
    width: 240,
    height: 578,
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
  }, params)
}

function createFightingFrame(mainFrame: BrowserWindow) {
  return createWindow('fighting-frame', {
    parent: mainFrame,
    title: '',
    width: 1189,
    height: 668,
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
  }, params)
}

function createHugeBlowingYukiFrame(mainFrame: BrowserWindow) {
  return createWindow('huge-blowing-yuki-frame', {
    parent: mainFrame,
    title: '汽笛',
    width: 1286,
    height: 724,
  })
}

function createBlackWhiteYukiFrame(mainFrame: BrowserWindow, magicNumber: number) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 254,
    height: 595,
  }
  const maxOffsetX = 400
  return createWindow('black-white-yuki-frame', {
    parent: mainFrame,
    title: '',
    ...windowSize,
    x: Math.round((screenSize.width - windowSize.width) / 2) + 400 + Math.floor(magicNumber * maxOffsetX),
    y: Math.round((screenSize.height - windowSize.height) / 2) + Math.floor(Math.sin(magicNumber * Math.PI * 2) * 40),
  })
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

function createCabbageFrame(mainFrame: BrowserWindow, offsetX: number, startFrame: number) {
  const screenSize = screen.getDisplayMatching(mainFrame.getBounds()).workAreaSize
  const windowSize = {
    width: 306,
    height: 207,
  }
  return createWindow('cabbage-frame', {
    parent: mainFrame,
    title: '不明绿色圆球',
    ...windowSize,
    x: Math.round((screenSize.width - windowSize.width) / 2 + offsetX),
    y: Math.round((screenSize.height - windowSize.height) / 2),
  }, startFrame)
}

function createCuttingYukiFrame(mainFrame: BrowserWindow) {
  return createWindow('cutting-yuki-frame', {
    parent: mainFrame,
    title: '',
    width: 185,
    height: 178,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    hasShadow: false,
  })
}

function loop(fn: Parameters<typeof raf>[0]) {
  raf(timestamp => {
    fn(timestamp)
    loop(fn)
  })
}

export function initializeWindows() {
  const mainFrame = createMainFrame()
  const jumpingYukiFrame = createJumpingYukiFrame(mainFrame)
  const walkingDog1Frame = createWalkingDogFrame(mainFrame)
  const walkingDog2Frame = createWalkingDogFrame(mainFrame)
  const walkingDog3Frame = createWalkingDogFrame(mainFrame)
  const walkingDog4Frame = createWalkingDogFrame(mainFrame)
  const walkingDog5Frame = createWalkingDogFrame(mainFrame)
  const walkingDog6Frame = createWalkingDogFrame(mainFrame)
  const rollingDog1Frame = createRollingDogFrame(mainFrame, [172, 811, 990, 1391, 1989, 2305, 2405])
  const rollingDog2Frame = createRollingDogFrame(mainFrame, [1395, 1993, 2309])
  const rollingDog3Frame = createRollingDogFrame(mainFrame, [1997, 2313])
  const rollingDog4Frame = createRollingDogFrame(mainFrame, [2317])
  const clappingYukiFrame = createClappingYukiFrame(mainFrame)
  const peekingPigeonFrame = createPeekingPigeonFrame(mainFrame)
  const staticYuki1Frame = createStaticYukiFrame(mainFrame, -400)
  const staticYuki2Frame = createStaticYukiFrame(mainFrame, 0)
  const staticYuki3Frame = createStaticYukiFrame(mainFrame, 400)
  const blackBirdFrame = createBlackBirdFrame(mainFrame)
  const whiteBirdFrame = createWhiteBirdFrame(mainFrame)
  const walkingYukiFrame = createWalkingYukiFrame(mainFrame)
  const staticPigeonGrey1Frame = createStaticPigeonFrame(mainFrame, -450)
  const staticPigeonGrey2Frame = createStaticPigeonFrame(mainFrame, -150)
  const staticPigeonGrey3Frame = createStaticPigeonFrame(mainFrame, 150)
  const staticPigeonWhiteFrame = createStaticPigeonFrame(mainFrame, 450, 'white')
  const fightingFrame = createFightingFrame(mainFrame)
  const ahhhhFrame = createAhhhhFrame(mainFrame)
  const errorFrames = Array.from({ length: 6 }, (_, index) => createErrorFrame(mainFrame, index))
  const wavingBirdBlack1Frame = createWavingBirdFrame(mainFrame)
  const wavingBirdBlack2Frame = createWavingBirdFrame(mainFrame)
  const wavingBirdBlack3Frame = createWavingBirdFrame(mainFrame)
  const wavingBirdBlack4Frame = createWavingBirdFrame(mainFrame)
  const wavingBirdWhite1Frame = createWavingBirdFrame(mainFrame, 'white')
  const wavingBirdWhite2Frame = createWavingBirdFrame(mainFrame, 'white')
  const wavingBirdWhite3Frame = createWavingBirdFrame(mainFrame, 'white')
  const hugeBlowingYukiFrame = createHugeBlowingYukiFrame(mainFrame)
  const blackWhiteYuki1Frame = createBlackWhiteYukiFrame(mainFrame, 0)
  const blackWhiteYuki2Frame = createBlackWhiteYukiFrame(mainFrame, 1 / 6)
  const blackWhiteYuki3Frame = createBlackWhiteYukiFrame(mainFrame, 1 / 3)
  const blackWhiteYuki4Frame = createBlackWhiteYukiFrame(mainFrame, 1 / 2)
  const blackWhiteYuki5Frame = createBlackWhiteYukiFrame(mainFrame, 2 / 3)
  const blackWhiteYuki6Frame = createBlackWhiteYukiFrame(mainFrame, 5 / 6)
  const blackWhiteYuki7Frame = createBlackWhiteYukiFrame(mainFrame, 1)
  const cabbage1Frame = createCabbageFrame(mainFrame, 0, 1535)
  const cabbage2Frame = createCabbageFrame(mainFrame, 0, 1567)
  const cabbage3Frame = createCabbageFrame(mainFrame, -180, 1604)
  const cabbage4Frame = createCabbageFrame(mainFrame, -60, 1614)
  const cabbage5Frame = createCabbageFrame(mainFrame, 60, 1624)
  const cabbage6Frame = createCabbageFrame(mainFrame, 180, 1634)
  const cabbage7Frame = createCabbageFrame(mainFrame, 0, 1640)
  const cabbage8Frame = createCabbageFrame(mainFrame, -180, 1650)
  const cabbage9Frame = createCabbageFrame(mainFrame, 180, 1660)
  const cabbage10Frame = createCabbageFrame(mainFrame, 0, 1670)
  const cuttingYukiFrame = createCuttingYukiFrame(mainFrame)

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

  emitter.once('jumping-yuki:keyframe-9', () => {
    jumpingYukiFrame.show()
  })

  emitter.once('walking-dog:keyframe-14', () => {
    showWalkingDogFrame(walkingDog1Frame, -450)
    showWalkingDogFrame(walkingDog2Frame, 450)
  })

  emitter.once('walking-dog:keyframe-152', () => {
    walkingDog1Frame.hide()
    walkingDog2Frame.hide()
  })

  emitter.once('walking-dog:keyframe-272', () => {
    showWalkingDogFrame(walkingDog1Frame, -450)
    showWalkingDogFrame(walkingDog2Frame, -225)
    showWalkingDogFrame(walkingDog3Frame, 0)
    showWalkingDogFrame(walkingDog4Frame, 225)
    showWalkingDogFrame(walkingDog5Frame, 450)
  })

  emitter.once('walking-dog:keyframe-309', () => {
    walkingDog1Frame.hide()
    walkingDog2Frame.hide()
    walkingDog3Frame.hide()
    walkingDog4Frame.hide()
    walkingDog5Frame.hide()
  })

  emitter.once('walking-dog:keyframe-1228', () => {
    showWalkingDogFrame(walkingDog1Frame, -450)
    showWalkingDogFrame(walkingDog2Frame, -225)
    showWalkingDogFrame(walkingDog3Frame, 225)
    showWalkingDogFrame(walkingDog4Frame, 450)
  })

  emitter.once('walking-dog:keyframe-1371', () => {
    walkingDog2Frame.hide()
    walkingDog3Frame.hide()
  })

  emitter.once('walking-dog:keyframe-1388', () => {
    walkingDog1Frame.hide()
    walkingDog4Frame.hide()
  })

  emitter.once('walking-dog:keyframe-1491', () => {
    showWalkingDogFrame(walkingDog1Frame, -450)
    showWalkingDogFrame(walkingDog2Frame, -225)
    showWalkingDogFrame(walkingDog3Frame, 225)
    showWalkingDogFrame(walkingDog4Frame, 450)
  })

  emitter.once('walking-dog:keyframe-1527', () => {
    walkingDog1Frame.hide()
    walkingDog2Frame.hide()
    walkingDog3Frame.hide()
    walkingDog4Frame.hide()
  })

  emitter.once('walking-dog:keyframe-1874', () => {
    showWalkingDogFrame(walkingDog1Frame, -225)
    showWalkingDogFrame(walkingDog2Frame, 225)
  })

  emitter.once('walking-dog:keyframe-1979', () => {
    walkingDog1Frame.hide()
    walkingDog2Frame.hide()
  })

  emitter.once('walking-dog:keyframe-2151', () => {
    showWalkingDogFrame(walkingDog1Frame, -450)
    showWalkingDogFrame(walkingDog2Frame, -338)
    showWalkingDogFrame(walkingDog3Frame, -226)
    showWalkingDogFrame(walkingDog4Frame, 222)
    showWalkingDogFrame(walkingDog5Frame, 334)
    showWalkingDogFrame(walkingDog6Frame, 446)
  })

  emitter.once('walking-dog:keyframe-2217', () => {
    showWalkingDogFrame(walkingDog1Frame, -562)
    showWalkingDogFrame(walkingDog6Frame, 558)
  })

  emitter.once('walking-dog:keyframe-2284', () => {
    walkingDog1Frame.hide()
    walkingDog2Frame.hide()
    walkingDog3Frame.hide()
    walkingDog4Frame.hide()
    walkingDog5Frame.hide()
    walkingDog6Frame.hide()
  })

  emitter.once('rolling-dog:keyframe-172', () => {
    rollingDog1Frame.show()
  })

  emitter.once('rolling-dog:keyframe-811', () => {
    rollingDog1Frame.show()
  })

  emitter.once('rolling-dog:keyframe-990', () => {
    rollingDog1Frame.show()
  })

  emitter.once('rolling-dog:keyframe-1391', () => {
    rollingDog1Frame.show()
  })

  emitter.once('rolling-dog:keyframe-1395', () => {
    rollingDog2Frame.show()
  })

  emitter.once('rolling-dog:keyframe-1989', () => {
    rollingDog1Frame.show()
  })

  emitter.once('rolling-dog:keyframe-1993', () => {
    rollingDog2Frame.show()
  })

  emitter.once('rolling-dog:keyframe-1997', () => {
    rollingDog3Frame.show()
  })

  emitter.once('rolling-dog:keyframe-2305', () => {
    rollingDog1Frame.show()
  })

  emitter.once('rolling-dog:keyframe-2309', () => {
    rollingDog2Frame.show()
  })

  emitter.once('rolling-dog:keyframe-2313', () => {
    rollingDog3Frame.show()
  })

  emitter.once('rolling-dog:keyframe-2317', () => {
    rollingDog4Frame.show()
  })

  emitter.once('rolling-dog:keyframe-2405', () => {
    rollingDog1Frame.show()
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
    staticYuki1Frame.show()
  })

  emitter.once('static-yuki:keyframe-244', () => {
    staticYuki2Frame.show()
  })

  emitter.once('static-yuki:keyframe-254', () => {
    staticYuki3Frame.show()
  })

  emitter.once('static-yuki:keyframe-1452', () => {
    staticYuki1Frame.show()
  })

  emitter.once('static-yuki:keyframe-1462', () => {
    staticYuki2Frame.show()
  })

  emitter.once('static-yuki:keyframe-1472', () => {
    staticYuki3Frame.show()
  })

  emitter.once('static-yuki:keyframe-2061', () => {
    staticYuki1Frame.show()
  })

  emitter.once('static-yuki:keyframe-2071', () => {
    staticYuki2Frame.show()
  })

  emitter.once('static-yuki:keyframe-2081', () => {
    staticYuki3Frame.show()
  })

  emitter.once('static-yuki:keyframe-2368', () => {
    staticYuki1Frame.show()
  })

  emitter.once('static-yuki:keyframe-2378', () => {
    staticYuki2Frame.show()
  })

  emitter.once('static-yuki:keyframe-2388', () => {
    staticYuki3Frame.show()
  })

  emitter.once('black-bird-white-bird:keyframe-315', () => {
    blackBirdFrame.show()
    whiteBirdFrame.show()
  })

  emitter.once('walking-yuki:keyframe-619', () => {
    walkingYukiFrame.show()
  })

  emitter.once('static-pigeon:keyframe-1149', () => {
    staticPigeonGrey1Frame.show()
  })

  emitter.once('static-pigeon:keyframe-1158', () => {
    staticPigeonGrey2Frame.show()
  })

  emitter.once('static-pigeon:keyframe-1167', () => {
    staticPigeonGrey3Frame.show()
  })

  emitter.once('static-pigeon:keyframe-1176', () => {
    staticPigeonWhiteFrame.show()
  })

  emitter.once('static-pigeon:keyframe-1184', () => {
    staticPigeonGrey1Frame.hide()
    staticPigeonGrey2Frame.hide()
    staticPigeonGrey3Frame.hide()
    staticPigeonWhiteFrame.hide()
  })

  emitter.once('fighting:keyframe-1184', () => {
    fightingFrame.show()
  })

  emitter.once('ahhhh:keyframe-1212', () => {
    ahhhhFrame.show()
  })

  emitter.once('ahhhh:keyframe-1226', () => {
    ahhhhFrame.hide()
  })

  const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

  emitter.once('error:keyframe-1214', async () => {
    for (const frame of errorFrames) {
      frame.show()
      await sleep(70)
    }
  })

  emitter.once('error:keyframe-1246', () => {
    errorFrames.forEach(frame => {
      frame.hide()
    })
  })

  emitter.once('waving-bird:keyframe-1685', () => {
    showWavingBirdFrame(wavingBirdBlack1Frame, -480)
    showWavingBirdFrame(wavingBirdBlack2Frame, -320)
    showWavingBirdFrame(wavingBirdBlack3Frame, -160)
    showWavingBirdFrame(wavingBirdWhite1Frame, 160)
    showWavingBirdFrame(wavingBirdWhite2Frame, 320)
    showWavingBirdFrame(wavingBirdWhite3Frame, 480)
  })

  emitter.once('waving-bird:keyframe-2099', () => {
    showWavingBirdFrame(wavingBirdWhite1Frame, -300)
    showWavingBirdFrame(wavingBirdBlack1Frame, -100)
    showWavingBirdFrame(wavingBirdWhite2Frame, 100)
    showWavingBirdFrame(wavingBirdBlack2Frame, 300)
  })

  emitter.once('waving-bird:keyframe-2439', () => {
    showWavingBirdFrame(wavingBirdBlack1Frame, -360)
    showWavingBirdFrame(wavingBirdWhite1Frame, -240)
    showWavingBirdFrame(wavingBirdBlack2Frame, -120)
    showWavingBirdFrame(wavingBirdWhite2Frame, 0)
    showWavingBirdFrame(wavingBirdBlack3Frame, 120)
    showWavingBirdFrame(wavingBirdWhite3Frame, 240)
    showWavingBirdFrame(wavingBirdBlack4Frame, 360)
  })

  emitter.once('huge-blowing-yuki:keyframe-1808', () => {
    hugeBlowingYukiFrame.show()
  })

  emitter.once('black-white-yuki:keyframe-1833', () => {
    blackWhiteYuki1Frame.show()
  })

  emitter.once('black-white-yuki:keyframe-1840', () => {
    blackWhiteYuki2Frame.show()
  })

  emitter.once('black-white-yuki:keyframe-1844', () => {
    blackWhiteYuki3Frame.show()
  })

  emitter.once('black-white-yuki:keyframe-1848', () => {
    blackWhiteYuki4Frame.show()
  })

  emitter.once('black-white-yuki:keyframe-1852', () => {
    blackWhiteYuki5Frame.show()
  })

  emitter.once('black-white-yuki:keyframe-1858', () => {
    blackWhiteYuki6Frame.show()
  })

  emitter.once('black-white-yuki:keyframe-1862', () => {
    blackWhiteYuki7Frame.show()
  })

  emitter.once('black-white-yuki:keyframe-1873', () => {
    blackWhiteYuki1Frame.hide()
    blackWhiteYuki2Frame.hide()
    blackWhiteYuki3Frame.hide()
    blackWhiteYuki4Frame.hide()
    blackWhiteYuki5Frame.hide()
    blackWhiteYuki6Frame.hide()
    blackWhiteYuki7Frame.hide()
  })

  emitter.once('cabbage:keyframe-1535', () => {
    cabbage1Frame.show()
  })

  emitter.once('cabbage:keyframe-1567', () => {
    cabbage2Frame.show()
  })

  emitter.once('cabbage:keyframe-1604', () => {
    cabbage3Frame.show()
  })

  emitter.once('cabbage:keyframe-1614', () => {
    cabbage4Frame.show()
  })

  emitter.once('cabbage:keyframe-1624', () => {
    cabbage5Frame.show()
  })

  emitter.once('cabbage:keyframe-1634', () => {
    cabbage6Frame.show()
  })

  emitter.once('cabbage:keyframe-1640', () => {
    cabbage7Frame.show()
  })

  emitter.once('cabbage:keyframe-1650', () => {
    cabbage8Frame.show()
  })

  emitter.once('cabbage:keyframe-1660', () => {
    cabbage9Frame.show()
  })

  emitter.once('cabbage:keyframe-1670', () => {
    cabbage10Frame.show()
  })

  emitter.once('cabbage:keyframe-1670', () => {
    cabbage10Frame.show()
  })

  emitter.once('cutting-yuki:keyframe-1527', () => {
    cuttingYukiFrame.show()
  })

  emitter.on('cutting-yuki:move', () => {
    const cursor = screen.getCursorScreenPoint()
    const [width, height] = cuttingYukiFrame.getSize()
    const windowSize = { width, height }
    cuttingYukiFrame.setPosition(cursor.x + 8, cursor.y - Math.round(windowSize.height / 2))
  })

  emitter.once('cutting-yuki:keyframe-1684', () => {
    cuttingYukiFrame.hide()
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
    if (frame >= 1184) {
      emitter.emit('static-pigeon:keyframe-1184')
    } else if (frame >= 1176) {
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
    // Ahhhh
    if (frame >= 1226) {
      emitter.emit('ahhhh:keyframe-1226')
    } else if (frame >= 1212) {
      emitter.emit('ahhhh:keyframe-1212')
    }
    // Errors
    if (frame >= 1246) {
      emitter.emit('error:keyframe-1246')
    } else if (frame >= 1214) {
      emitter.emit('error:keyframe-1214')
    }
    // Waving birds
    if (frame >= 2439) {
      emitter.emit('waving-bird:keyframe-2439')
    } else if (frame >= 2099) {
      emitter.emit('waving-bird:keyframe-2099')
    } else if (frame >= 1685) {
      emitter.emit('waving-bird:keyframe-1685')
    }
    // Huge blowing Yuki
    if (frame >= 1808) {
      emitter.emit('huge-blowing-yuki:keyframe-1808')
    }
    // Black white yuki
    if (frame >= 1873) {
      emitter.emit('black-white-yuki:keyframe-1873')
    } else if (frame >= 1862) {
      emitter.emit('black-white-yuki:keyframe-1862')
    } else if (frame >= 1858) {
      emitter.emit('black-white-yuki:keyframe-1858')
    } else if (frame >= 1852) {
      emitter.emit('black-white-yuki:keyframe-1852')
    } else if (frame >= 1848) {
      emitter.emit('black-white-yuki:keyframe-1848')
    } else if (frame >= 1844) {
      emitter.emit('black-white-yuki:keyframe-1844')
    } else if (frame >= 1840) {
      emitter.emit('black-white-yuki:keyframe-1840')
    } else if (frame >= 1833) {
      emitter.emit('black-white-yuki:keyframe-1833')
    }
    // Cabbage
    if (frame >= 1670) {
      emitter.emit('cabbage:keyframe-1670')
    } else if (frame >= 1660) {
      emitter.emit('cabbage:keyframe-1660')
    } else if (frame >= 1650) {
      emitter.emit('cabbage:keyframe-1650')
    } else if (frame >= 1640) {
      emitter.emit('cabbage:keyframe-1640')
    } else if (frame >= 1634) {
      emitter.emit('cabbage:keyframe-1634')
    } else if (frame >= 1624) {
      emitter.emit('cabbage:keyframe-1624')
    } else if (frame >= 1614) {
      emitter.emit('cabbage:keyframe-1614')
    } else if (frame >= 1604) {
      emitter.emit('cabbage:keyframe-1604')
    } else if (frame >= 1567) {
      emitter.emit('cabbage:keyframe-1567')
    } else if (frame >= 1535) {
      emitter.emit('cabbage:keyframe-1535')
    }
    // Cutting Yuki
    if (frame >= 1684) {
      emitter.emit('cutting-yuki:keyframe-1684')
    } else if (frame >= 1527) {
      emitter.emit('cutting-yuki:keyframe-1527')
      emitter.emit('cutting-yuki:move')
    }
    broadcast('play', frame, frameInterval)
  })
}
