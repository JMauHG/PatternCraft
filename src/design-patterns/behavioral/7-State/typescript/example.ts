// ✅ GOOD: State Pattern - Each state is its own class with its own behavior

// State interface: all behaviors that change between states
interface PlayerState {
  getName(): string;
  pressPlay(player: AudioPlayer): void;
  pressPause(player: AudioPlayer): void;
  pressStop(player: AudioPlayer): void;
}

// Context: the audio player delegates behavior to its current state
class AudioPlayer {
  private state: PlayerState;
  private currentTrack: string;

  constructor(track: string) {
    this.currentTrack = track;
    this.state = new StoppedState();
  }

  public setState(state: PlayerState): void {
    this.state = state;
    console.log(`  -> state is now ${state.getName()}`);
  }

  public getTrack(): string {
    return this.currentTrack;
  }

  public pressPlay(): void {
    this.state.pressPlay(this);
  }

  public pressPause(): void {
    this.state.pressPause(this);
  }

  public pressStop(): void {
    this.state.pressStop(this);
  }
}

// Concrete state: Playing
class PlayingState implements PlayerState {
  public getName(): string {
    return 'Playing';
  }

  public pressPlay(player: AudioPlayer): void {
    console.log(`[Playing] Already playing "${player.getTrack()}"`);
  }

  public pressPause(player: AudioPlayer): void {
    console.log(`[Playing] Pausing "${player.getTrack()}"`);
    player.setState(new PausedState());
  }

  public pressStop(player: AudioPlayer): void {
    console.log(`[Playing] Stopping "${player.getTrack()}"`);
    player.setState(new StoppedState());
  }
}

// Concrete state: Paused
class PausedState implements PlayerState {
  public getName(): string {
    return 'Paused';
  }

  public pressPlay(player: AudioPlayer): void {
    console.log(`[Paused] Resuming "${player.getTrack()}"`);
    player.setState(new PlayingState());
  }

  public pressPause(player: AudioPlayer): void {
    console.log(`[Paused] Already paused`);
  }

  public pressStop(player: AudioPlayer): void {
    console.log(`[Paused] Stopping "${player.getTrack()}"`);
    player.setState(new StoppedState());
  }
}

// Concrete state: Stopped
class StoppedState implements PlayerState {
  public getName(): string {
    return 'Stopped';
  }

  public pressPlay(player: AudioPlayer): void {
    console.log(`[Stopped] Starting "${player.getTrack()}" from the beginning`);
    player.setState(new PlayingState());
  }

  public pressPause(player: AudioPlayer): void {
    console.log(`[Stopped] Cannot pause — player is stopped`);
  }

  public pressStop(player: AudioPlayer): void {
    console.log(`[Stopped] Already stopped`);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== State Pattern: Audio Player ===\n');

  const player = new AudioPlayer('Imagine - John Lennon');

  player.pressPause(); // stopped: cannot pause
  console.log('');

  player.pressPlay();  // stopped -> playing
  console.log('');

  player.pressPlay();  // playing: already playing
  console.log('');

  player.pressPause(); // playing -> paused
  console.log('');

  player.pressPause(); // paused: already paused
  console.log('');

  player.pressPlay();  // paused -> playing
  console.log('');

  player.pressStop();  // playing -> stopped

  console.log('\n Benefits of State Pattern:');
  console.log('  - No giant switch/if-else blocks on a state string');
  console.log('  - Each state encapsulates its own behavior and transitions');
  console.log('  - Adding a new state does not modify existing states');
  console.log('  - Transitions are explicit and easy to follow');
  console.log('  - States can be tested independently');
}

main();

export {};
