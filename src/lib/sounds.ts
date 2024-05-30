import { Howl } from 'howler';

type SoundTypes = 'move' | 'error' | 'win' | 'reset';

const sounds: Record<SoundTypes, Howl> = {
  move: new Howl({ src: ['/mp3/move.mp3'] }),
  error: new Howl({ src: ['/mp3/error.mp3'] }),
  win: new Howl({ src: ['/mp3/win.mp3'] }),
  reset: new Howl({ src: ['/mp3/reset.mp3'] }),
};

/**
 * Play a sound effect
 * @param type - the type of sound to play
 */
export const playSound = (type: SoundTypes) => {
  sounds[type].play();
};
