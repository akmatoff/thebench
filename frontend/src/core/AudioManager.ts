import { Howl } from "howler";
import bgAudio from "../assets/audio/bg_music.mp3";
import bgAmbience from "../assets/audio/bg_ambience.mp3";
import footstep1 from "../assets/audio/footstep-1.mp3";
import footstep2 from "../assets/audio/footstep-2.mp3";
import footstep3 from "../assets/audio/footstep-3.mp3";

export class AudioManager {
  public backgroundMusic: Howl;
  public backgroundAmbience: Howl;

  private footstepSounds: Howl[];

  constructor() {
    this.backgroundMusic = new Howl({
      src: bgAudio,
      loop: true,
      volume: 0.4,
    });

    setTimeout(() => {
      this.backgroundMusic.play();
    }, 18000);

    this.backgroundAmbience = new Howl({
      src: bgAmbience,
      loop: true,
      volume: 0,
    });

    this.backgroundAmbience.play();
    this.backgroundAmbience.fade(0, 0.6, 3000);

    this.footstepSounds = [
      new Howl({ src: footstep1 }),
      new Howl({ src: footstep2 }),
      new Howl({ src: footstep3 }),
    ];

    this.addFilters();
  }

  public playFootstep() {
    if (this.footstepSounds.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.footstepSounds.length);
    const footstepSound = this.footstepSounds[randomIndex];

    footstepSound.volume(Math.random() * 0.3 + 0.05);
    footstepSound.rate(0.6 + Math.random() * 0.2);
    footstepSound.play();
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
}
