import type { EventEmitter } from 'node:events'

export interface WorldBridge {
  name: string,
  initialPosition: { x: number, y: number },
  fps: number,
  keyframes: Pick<EventEmitter, 'once' | 'emit'>,
  syncTime(time: number): void,
  onReady(fn: () => void): void,
  onPlay(fn: (frame: number) => void): void,
  moveTo(position: { x?: number, y?: number }): void,
  toggleVisibility(visibility: boolean): void,
}
