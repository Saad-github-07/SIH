/**
 * Voice & Regional Speech Synthesis Service
 * Provides Web Speech API Text-to-Speech + Audio Tone Generation for Sound Quizzes
 */

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.audioCtx = null;
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    return this.audioCtx;
  }

  speak(text, langCode = 'en') {
    if (!this.synth) return;
    
    // Stop ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slower rate for elderly comprehension
    utterance.pitch = 1.0;

    // Map language code to BCP 47 tag
    const langMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      as: 'as-IN',
      bn: 'bn-IN',
      mni: 'hi-IN',
      mzo: 'en-IN',
      brx: 'hi-IN',
      kha: 'en-IN',
    };

    utterance.lang = langMap[langCode] || 'en-IN';

    // Find regional voice if available
    const voices = this.synth.getVoices();
    const voice = voices.find(v => v.lang.startsWith(utterance.lang.substring(0, 2)));
    if (voice) {
      utterance.voice = voice;
    }

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Synthesize sound quiz frequencies using Web Audio API
   */
  playSoundQuizFreq(freq, type = 'dhol') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'dhol') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      } else if (type === 'bell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq || 587, ctx.currentTime);
        gain.gain.setValueAtTime(0.8, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq || 440, ctx.currentTime);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.warn('Audio synth error:', e);
    }
  }
}

export const speechService = new SpeechService();
