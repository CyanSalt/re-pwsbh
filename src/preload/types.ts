export interface WorldBridge {
  args: string[],
  initialPosition: { x: number, y: number },
  fps: number,
  syncTime(time: number): void,
  onPlay(fn: (frame: number) => void): void,
  moveTo(position: { x?: number, y?: number }): void,
  setOpacity(value: number): void,
}
