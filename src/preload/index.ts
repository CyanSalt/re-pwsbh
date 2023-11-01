import { EventEmitter } from 'node:events'
import { contextBridge, ipcRenderer } from 'electron'
import type { WorldBridge } from './types'

const argIndex = process.argv.indexOf('--') + 1
const additionalArgs = argIndex > 0 && argIndex < process.argv.length
  ? JSON.parse(process.argv[argIndex]) as {
    name: string,
    initialPosition: { x: number, y: number },
    fps: number,
  }
  : undefined

const FPS = additionalArgs?.fps ?? 30

let whenReady = new Promise<void>(resolve => {
  ipcRenderer.once('show', () => {
    resolve()
  })
})

const emitter = new EventEmitter()
const keyframes = {
  once(...args: Parameters<EventEmitter['once']>): ReturnType<EventEmitter['once']> {
    return emitter.once(...args)
  },
  emit(...args: Parameters<EventEmitter['emit']>): ReturnType<EventEmitter['emit']> {
    return emitter.emit(...args)
  },
}

const worldBridge: WorldBridge = {
  name: additionalArgs?.name ?? '',
  initialPosition: additionalArgs?.initialPosition ?? { x: 0, y: 0 },
  fps: FPS,
  keyframes,
  syncTime(time) {
    ipcRenderer.send('sync-time', time)
  },
  onReady(fn) {
    whenReady.then(fn)
  },
  onPlay(fn) {
    ipcRenderer.on('time-update', (event, time: number) => {
      fn(Math.round(time * 1000 / FPS))
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
