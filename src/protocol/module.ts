/** Types only: the one door a host drives. The full contract is in the game's docs/GAME-SPEC.md. */
export interface GameSaveLike {
  v: number;
  game: Record<string, unknown>;
  story?: unknown;
}

export interface GameModule {
  mount(container: HTMLElement, options?: unknown): Promise<void>;
  start(params?: Record<string, unknown>): void;
  pause(reason?: string): void;
  resume(reason?: string): void;
  setInputEnabled(enabled: boolean): void;
  /** Host to game. */
  send(name: string, payload?: unknown): void;
  /** Game to host. Returns a function that removes the listener. */
  on(name: string, fn: (payload?: unknown) => void): () => void;
  getSave(): GameSaveLike;
  loadSave(save: GameSaveLike): void;
  destroy(): void;
}
