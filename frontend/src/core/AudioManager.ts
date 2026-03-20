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

export class AudioManager {
  public backgroundMusic: Howl;
  public backgroundAmbience: Howl;

  private footstepSounds: Howl[];
  private cigaretteDragSounds: Howl[];
  private lighterSounds: Howl[];

  constructor() {
    this.backgroundMusic = new Howl({
      src: bgAudio,
      volume: 0.3,
    });

    this.backgroundAmbience = new Howl({
      src: bgAmbience,
      loop: true,
      volume: 0,
    });

    this.backgroundAmbience.play();
    this.backgroundAmbience.fade(0, 0.8, 3000);

    this.footstepSounds = [
      new Howl({ src: footstep1 }),
      new Howl({ src: footstep2 }),
      new Howl({ src: footstep3 }),
    ];

    this.cigaretteDragSounds = [
      new Howl({ src: cigaretteDrag }),
      new Howl({ src: cigaretteDrag2 }),
    ];

    this.lighterSounds = [
      new Howl({ src: lighter }),
      new Howl({ src: lighter2 }),
    ];

    this.playBackgroundMusic();
    this.addFilters();
  }

  private playBackgroundMusic() {
    const playLooped = () => {
      const delay = Math.random() * 30_000 + 30_000;

      this.backgroundMusic.play();
      this.backgroundMusic.once("end", () => {
        setTimeout(playLooped, delay);
      });
    };

    setTimeout(playLooped, 25_000);
  }

  private addFilters() {
    const ambienceFilter = Howler.ctx.createBiquadFilter();

    ambienceFilter.type = "highpass";
    ambienceFilter.frequency.value = 300;
    ambienceFilter.Q.value = 0.5;

    Howler.masterGain.disconnect();
    Howler.masterGain.connect(ambienceFilter);

    ambienceFilter.connect(Howler.ctx.destination);
  }

  public playFootstep() {
    if (this.footstepSounds.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.footstepSounds.length);
    const footstepSound = this.footstepSounds[randomIndex];

    footstepSound.volume(Math.random() * 0.5 + 0.1);
    footstepSound.rate(0.6 + Math.random() * 0.2);
    footstepSound.play();
  }

  public playCigaretteDrag() {
    if (this.cigaretteDragSounds.length === 0) return;

    const randomIndex = Math.floor(
      Math.random() * this.cigaretteDragSounds.length
    );
    const cigaretteDragSound = this.cigaretteDragSounds[randomIndex];

    cigaretteDragSound.volume(Math.random() * 1.6 + 0.2);
    cigaretteDragSound.rate(0.9 + Math.random() * 0.2);
    cigaretteDragSound.play();
  }

  public playLighter() {
    if (this.lighterSounds.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.lighterSounds.length);
    const lighterSound = this.lighterSounds[randomIndex];

    lighterSound.volume(Math.random() * 1.05 + 0.2);
    lighterSound.rate(0.9 + Math.random() * 0.25);
    lighterSound.play();
  }
}
