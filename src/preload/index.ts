import { contextBridge, ipcRenderer } from 'electron'
import type { WorldBridge } from './types'

const argIndex = process.argv.indexOf('--') + 1
const args = argIndex ? process.argv.slice(argIndex) : []

// The larger this value is, the slower the background will be played
const FPS = 46.46 // TODO: wtf?

const initialPosition = ipcRenderer.sendSync('get-position') as { x: number, y: number }

const worldBridge: WorldBridge = {
  args,
  initialPosition,
  fps: FPS,
  syncTime(time) {
    ipcRenderer.send('sync-time', time)
  },
  onPlay(fn) {
    ipcRenderer.on('time-update', (event, time: number) => {
      fn(time * 1000 / FPS)
    })
  },
  moveTo(position) {
    ipcRenderer.send('move-to', position)
  },
  setOpacity(value) {
    ipcRenderer.send('set-opacity', value)
  },
}

contextBridge.exposeInMainWorld('worldBridge', worldBridge)
