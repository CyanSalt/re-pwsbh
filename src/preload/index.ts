import { contextBridge, ipcRenderer } from 'electron'
import type { WorldBridge } from './types'

const argIndex = process.argv.indexOf('--') + 1
const args = argIndex ? process.argv.slice(argIndex) : []

const worldBridge: WorldBridge = {
  args,
  syncTime(time) {
    ipcRenderer.send('sync-time', time)
  },
  onPlay(fn) {
    ipcRenderer.on('time-update', (event, time: number) => {
      fn(time * 1000 / 46) // TODO: wtf
    })
  },
}

contextBridge.exposeInMainWorld('worldBridge', worldBridge)
