import { Howl } from "howler";
import bgAudio from "../assets/bg_music.mp3";
import bgAmbience from "../assets/bg_ambience.mp3";

export class AudioManager {
  public backgroundMusic: Howl;
  public backgroundAmbience: Howl;

  constructor() {
    this.backgroundMusic = new Howl({
      src: bgAudio,
      loop: true,
      volume: 0.08,
      html5: true,
    });

    setTimeout(() => {
      this.backgroundMusic.play();
    }, 18000);

    this.backgroundAmbience = new Howl({
      src: bgAmbience,
      loop: true,
      volume: 0,
      html5: true,
    });

    this.backgroundAmbience.play();
    this.backgroundAmbience.fade(0, 0.15, 3000);

    this.addFilters();
  }

  private addFilters() {
    const ambienceFilter = Howler.ctx.createBiquadFilter();

    ambienceFilter.type = "highpass";
    ambienceFilter.frequency.value = 800;
    ambienceFilter.Q.value = 0.8;

    Howler.masterGain.disconnect();
    Howler.masterGain.connect(ambienceFilter);

    ambienceFilter.connect(Howler.ctx.destination);
  }
}
