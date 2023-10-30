import { contextBridge } from 'electron'
import type { WorldBridge } from './types'

const argIndex = process.argv.indexOf('--') + 1
const args = argIndex ? process.argv.slice(argIndex) : []

const worldBridge: WorldBridge = {
  args,
}

contextBridge.exposeInMainWorld('worldBridge', worldBridge)
