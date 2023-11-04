import type { EventEmitter } from 'node:events'

export interface WorldBridge {
  name: string,
  params: unknown,
  initialPosition: { x: number, y: number },
  initialSize: { width: number, height: number },
  keyframes: Pick<EventEmitter, 'once' | 'emit'>,
  syncTime(time: number): void,
  onReady(fn: () => void): void,
  onPlay(fn: (frame: number, interval: number) => void): void,
  moveTo(position: { x?: number, y?: number }): void,
  toggleVisibility(visibility: boolean): void,
  setOpacity(value: number): void,
  log(message: unknown): void,
}
