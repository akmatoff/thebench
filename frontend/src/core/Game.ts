import { Application, Ticker } from "pixi.js";
import { Viewport } from "pixi-viewport";

import { WS_URL } from "../config";
import { Action } from "../types/game";
import { MovementDirection, Player } from "../types/player";

import { AudioManager } from "./AudioManager";
import { BaseScene } from "./BaseScene";
import { GameSocket } from "./GameSocket";
import { GameState } from "./GameState";
import { InputSystem } from "./systems/InputSystem";
import { PlayerSystem } from "./systems/PlayerSystem";

export const WORLD_WIDTH = 2048;
export const WORLD_HEIGHT = 1152;

export class Game {
  public app: Application;
  public audio: AudioManager;
  public viewport: Viewport;

  public readonly state: GameState;
  public readonly socket: GameSocket;
  public readonly input: InputSystem;
  public readonly playerSystem: PlayerSystem;

  public playerId: string | null = null;

  private currentScene: BaseScene | null = null;

  constructor(app: Application, audio: AudioManager, viewport: Viewport) {
    this.app = app;
    this.audio = audio;
    this.viewport = viewport;

    this.state = new GameState();
    this.socket = new GameSocket(this.state, WS_URL);
    this.playerSystem = new PlayerSystem(this);
    this.input = new InputSystem(this);

    this.socket.onConnected = (playerId) => {
      this.setPlayerId(playerId);
    };

    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  public start(SceneClass: new (game: Game) => BaseScene): void {
    this.currentScene = new SceneClass(this);
    this.currentScene.init();

    this.viewport.addChild(this.currentScene.container);
    this.app.ticker.add(this.update, this);
  }

  public getPlayerState(id: string): Player | undefined {
    return this.state.snapshot?.players[id];
  }

  public getCurrentPlayerState(): Player | undefined {
    if (!this.state.snapshot || !this.playerId) return undefined;
    return this.state.snapshot.players[this.playerId];
  }

  public sendAction(action: Action): void {
    this.socket.sendAction(action);
  }

  public setPlayerId(id: string): void {
    this.playerId = id;
  }

  public movePlayer(direction: MovementDirection): void {
    this.playerSystem.setMovementDirection(direction);
  }

  public stopPlayerMovement(): void {
    this.playerSystem.stopMovement();
  }

  public sitOnTheBench(): void {
    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer) return;

    const bench = this.state.snapshot?.bench;
    if (!bench) return;

    const minX = bench.position.x - bench.seatRadius;
    const maxX = bench.position.x + bench.seatRadius;
    const isInRange =
      currentPlayer.position.x >= minX && currentPlayer.position.x <= maxX;

    if (!isInRange) {
      console.log("too far from bench");
      return;
    }

    this.sendAction("sit");
  }

  public followPlayer(): void {
    const player = this.getCurrentPlayer();
    if (!player) return;

    this.viewport.moveCenter(player.x, this.viewport.center.y);
  }

  public takeDrag() {
    const player = this.getCurrentPlayer();
    if (!player) return;

    return player.takeDrag();
  }

  public canPlayerTakeDrag(): boolean {
    const player = this.getCurrentPlayer();
    if (!player) return false;

    return player.canTakeDrag();
  }

  public destroy(): void {
    window.removeEventListener("resize", this.onResize);
    this.app.ticker.remove(this.update, this);

    this.currentScene?.destroy();
    this.socket.destroy();
    this.input.destroy();
    this.audio.dispose();
  }

  private update(ticker: Ticker): void {
    const delta = Math.min(ticker.elapsedMS / 1000, 0.1);

    this.currentScene?.update(delta);
    this.playerSystem.updateMovement(delta);
    this.playerSystem.updateFootsteps();

    this.followPlayer();
  }

  private getCurrentPlayer() {
    if (!this.playerId) return undefined;
    return this.playerSystem.getPlayer(this.playerId);
  }

  private onResize = (): void => {
    this.app.resize();
    this.viewport.resize(
      window.innerWidth,
      window.innerHeight,
      WORLD_WIDTH,
      WORLD_HEIGHT
    );

    this.currentScene?.onResize?.();
    this.playerSystem.onResize();
  };
}
