import { Howl } from "howler";

import bgAudio from "../assets/audio/bg_music.mp3";
import bgAmbience from "../assets/audio/bg_ambience.mp3";
import footstep1 from "../assets/audio/footstep-1.mp3";
import footstep2 from "../assets/audio/footstep-2.mp3";
import footstep3 from "../assets/audio/footstep-3.mp3";
import cigaretteDrag from "../assets/audio/cigarette_drag.mp3";
import cigaretteDrag2 from "../assets/audio/cigarette_drag2.mp3";
import lighter from "../assets/audio/lighter.mp3";
import lighter2 from "../assets/audio/lighter2.wav";

type SoundVariationConfig = {
  volume: [min: number, max: number];
  rate: [min: number, max: number];
};

export class AudioManager {
  public readonly backgroundMusic: Howl;
  public readonly backgroundAmbience: Howl;

  private readonly footstepSounds: Howl[];
  private readonly cigaretteDragSounds: Howl[];
  private readonly lighterSounds: Howl[];

  private bgMusicStartTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private bgMusicLoopTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private disposed = false;

  constructor() {
    this.backgroundMusic = new Howl({
      src: [bgAudio],
      volume: 0.2,
    });

    this.backgroundAmbience = new Howl({
      src: [bgAmbience],
      loop: true,
      volume: 0,
    });

    this.footstepSounds = this.createSounds([footstep1, footstep2, footstep3]);
    this.cigaretteDragSounds = this.createSounds([
      cigaretteDrag,
      cigaretteDrag2,
    ]);
    this.lighterSounds = this.createSounds([lighter, lighter2]);

    this.startBackgroundAmbience();
    this.scheduleBackgroundMusic();
  }

  public playFootstep() {
    this.playRandomSound(this.footstepSounds, {
      volume: [0.1, 0.6],
      rate: [0.6, 0.8],
    });
  }

  public playCigaretteDrag() {
    this.playRandomSound(this.cigaretteDragSounds, {
      volume: [0.8, 1.8],
      rate: [0.9, 1.1],
    });
  }

  public playLighter() {
    this.playRandomSound(this.lighterSounds, {
      volume: [0.2, 1.25],
      rate: [0.9, 1.15],
    });
  }

  public dispose() {
    this.disposed = true;

    if (this.bgMusicStartTimeoutId) {
      clearTimeout(this.bgMusicStartTimeoutId);
      this.bgMusicStartTimeoutId = null;
    }

    if (this.bgMusicLoopTimeoutId) {
      clearTimeout(this.bgMusicLoopTimeoutId);
      this.bgMusicLoopTimeoutId = null;
    }

    this.backgroundMusic.stop();
    this.backgroundAmbience.stop();

    [
      this.backgroundMusic,
      this.backgroundAmbience,
      ...this.footstepSounds,
      ...this.cigaretteDragSounds,
      ...this.lighterSounds,
    ].forEach((sound) => sound.unload());
  }

  private createSounds(srcList: string[]) {
    return srcList.map((src) => new Howl({ src: [src] }));
  }

  private startBackgroundAmbience() {
    this.backgroundAmbience.play();
    this.backgroundAmbience.fade(0, 1.5, 3000);
  }

  private scheduleBackgroundMusic() {
    const playLooped = () => {
      if (this.disposed) return;

      this.backgroundMusic.play();

      this.backgroundMusic.once("end", () => {
        if (this.disposed) return;

        const delay = this.randomBetween(50_000, 120_000);
        this.bgMusicLoopTimeoutId = setTimeout(playLooped, delay);
      });
    };

    this.bgMusicStartTimeoutId = setTimeout(playLooped, 25_000);
  }

  private playRandomSound(sounds: Howl[], config: SoundVariationConfig) {
    if (sounds.length === 0 || this.disposed) return;

    const sound = this.pickRandom(sounds);
    const [minVolume, maxVolume] = config.volume;
    const [minRate, maxRate] = config.rate;

    sound.volume(this.randomBetween(minVolume, maxVolume));
    sound.rate(this.randomBetween(minRate, maxRate));
    sound.play();
  }

  private pickRandom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
