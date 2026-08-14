/**
 * Real-time Web Audio API synthesizer for nostalgic village sounds
 */

class VillageSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbiencePlaying = false;
  private cricketOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Hero Cycle Bell (Tring! Tring!)
   * Twin chime resonant metallic bell strike
   */
  public playCycleBell() {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const playChime = (delay: number, pitchOffset = 0) => {
      const startTime = now + delay;
      const fundamental = 2400 + pitchOffset;

      const freqs = [fundamental, fundamental * 1.52, fundamental * 2.1, fundamental * 3.2];
      const gains = [0.4, 0.25, 0.15, 0.08];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.98, startTime + 0.35);

        gain.gain.setValueAtTime(gains[i], startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.36);
      });
    };

    // First ring
    playChime(0, 0);
    // Second ring (Tring-Tring!)
    playChime(0.12, 120);
  }

  /**
   * Tube-well running water splash
   */
  public playTubewellSplash() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const duration = 2.0;

    // Generate white noise buffer
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to sound like flowing gushing water
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(2.0, now);

    // LFO to modulate flow
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4, now);
    lfoGain.gain.setValueAtTime(200, now);
    lfo.connect(filter.frequency);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    lfo.start(now);
    noise.stop(now + duration);
    lfo.stop(now + duration);
  }

  /**
   * Vintage Radio Dial Static & Tuning sweep
   */
  public playRadioTuning() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const duration = 1.2;

    // Static burst
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1800, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(3200, now + 0.6);
    noiseFilter.frequency.exponentialRampToValueAtTime(900, now + duration);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Frequency whistle sweep (heterodyne whistle)
    const whistle = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistle.type = 'sine';
    whistle.frequency.setValueAtTime(2200, now);
    whistle.frequency.exponentialRampToValueAtTime(1100, now + 0.5);
    whistle.frequency.exponentialRampToValueAtTime(1700, now + duration);

    whistleGain.gain.setValueAtTime(0.08, now);
    whistleGain.gain.linearRampToValueAtTime(0.12, now + 0.4);
    whistleGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    whistle.connect(whistleGain);
    whistleGain.connect(ctx.destination);

    noise.start(now);
    whistle.start(now);
    noise.stop(now + duration);
    whistle.stop(now + duration);
  }

  /**
   * Cassette Deck Click & Snap
   */
  public playCassetteClick() {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Heavy mechanical click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);

    // Secondary latch click
    setTimeout(() => {
      const now2 = ctx.currentTime;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(800, now2);
      osc2.frequency.exponentialRampToValueAtTime(200, now2 + 0.05);

      gain2.gain.setValueAtTime(0.3, now2);
      gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.05);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now2);
      osc2.stop(now2 + 0.06);
    }, 60);
  }

  /**
   * Temple Bell / Shankh resonant gong
   */
  public playTempleBell() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    const baseFreq = 528; // Sacred harmonic frequency

    const harmonics = [
      { f: baseFreq, g: 0.5, decay: 3.5 },
      { f: baseFreq * 1.5, g: 0.3, decay: 2.8 },
      { f: baseFreq * 2.0, g: 0.2, decay: 2.0 },
      { f: baseFreq * 2.76, g: 0.1, decay: 1.5 },
    ];

    harmonics.forEach(({ f, g, decay }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.linearRampToValueAtTime(f * 0.998, now + decay);

      gain.gain.setValueAtTime(g, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });
  }

  /**
   * Retro Camera Shutter Click
   */
  public playCameraShutter() {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Quick burst of high-frequency noise
    const bufferSize = Math.floor(ctx.sampleRate * 0.1);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1500, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.1);
  }

  /**
   * Toggle gentle village ambience (crickets & evening breeze)
   */
  public toggleAmbience(enable: boolean) {
    const ctx = this.getContext();
    if (!enable) {
      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      }
      this.isAmbiencePlaying = false;
      return;
    }

    if (this.isAmbiencePlaying) return;
    this.isAmbiencePlaying = true;

    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);
    this.ambientGain.connect(ctx.destination);

    // Chirping crickets oscillators
    [4200, 4700, 5200].forEach((freq) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Tremolo
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.setValueAtTime(14 + Math.random() * 4, ctx.currentTime);
      lfoG.gain.setValueAtTime(0.5, ctx.currentTime);
      lfo.connect(g.gain);

      osc.connect(g);
      g.connect(this.ambientGain!);

      osc.start();
      lfo.start();
    });
  }
}

export const villageSounds = new VillageSoundSynthesizer();
