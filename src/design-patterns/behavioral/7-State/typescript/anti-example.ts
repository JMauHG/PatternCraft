// ❌ BAD: No State Pattern - Giant switch/if-else blocks on a state string

type PlayerStateName = 'playing' | 'paused' | 'stopped';

class AudioPlayer {
  private state: PlayerStateName;
  private currentTrack: string;

  constructor(track: string) {
    this.currentTrack = track;
    this.state = 'stopped';
  }

  public pressPlay(): void {
    // Every method repeats the same branching structure
    switch (this.state) {
      case 'stopped':
        console.log(`[stopped] Starting "${this.currentTrack}" from the beginning`);
        this.state = 'playing';
        console.log('  -> state is now playing');
        break;
      case 'paused':
        console.log(`[paused] Resuming "${this.currentTrack}"`);
        this.state = 'playing';
        console.log('  -> state is now playing');
        break;
      case 'playing':
        console.log(`[playing] Already playing "${this.currentTrack}"`);
        break;
    }
  }

  public pressPause(): void {
    switch (this.state) {
      case 'stopped':
        console.log('[stopped] Cannot pause — player is stopped');
        break;
      case 'paused':
        console.log('[paused] Already paused');
        break;
      case 'playing':
        console.log(`[playing] Pausing "${this.currentTrack}"`);
        this.state = 'paused';
        console.log('  -> state is now paused');
        break;
    }
  }

  public pressStop(): void {
    switch (this.state) {
      case 'stopped':
        console.log('[stopped] Already stopped');
        break;
      case 'paused':
        console.log(`[paused] Stopping "${this.currentTrack}"`);
        this.state = 'stopped';
        console.log('  -> state is now stopped');
        break;
      case 'playing':
        console.log(`[playing] Stopping "${this.currentTrack}"`);
        this.state = 'stopped';
        console.log('  -> state is now stopped');
        break;
    }
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Audio Player with State Strings ===\n');

  const player = new AudioPlayer('Imagine - John Lennon');

  player.pressPause();
  console.log('');
  player.pressPlay();
  console.log('');
  player.pressPlay();
  console.log('');
  player.pressPause();
  console.log('');
  player.pressPause();
  console.log('');
  player.pressPlay();
  console.log('');
  player.pressStop();

  console.log('\n Problems with this approach:');
  console.log('  - Every method repeats the same switch on the state string');
  console.log('  - Adding a new state (e.g. "buffering") means editing every method');
  console.log('  - State-specific behavior is scattered across many methods');
  console.log('  - No compile-time guarantee every state handles every action');
  console.log('  - Violates Single Responsibility and Open/Closed principles');
}

main();

export {};
