import { contextBridge, ipcRenderer } from 'electron'
import type { WorldBridge } from './types'

const argIndex = process.argv.indexOf('--') + 1
const args = argIndex ? process.argv.slice(argIndex) : []

const fps = ipcRenderer.sendSync('get-fps') as number
const initialPosition = ipcRenderer.sendSync('get-position') as { x: number, y: number }

const worldBridge: WorldBridge = {
  args,
  initialPosition,
  fps,
  syncTime(time) {
    ipcRenderer.send('sync-time', time)
  },
  onPlay(fn) {
    ipcRenderer.on('time-update', (event, time: number) => {
      fn(time * 1000 / fps)
    })
  },
  moveTo(position) {
    ipcRenderer.send('move-to', position)
  },
  toggleVisibility(value) {
    ipcRenderer.send('toggle-visibility', value)
  },
}

contextBridge.exposeInMainWorld('worldBridge', worldBridge)
