export interface WorldBridge {
  args: string[],
  syncTime(time: number): void,
  onPlay(fn: (frame: number) => void): void,
}
