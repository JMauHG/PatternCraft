// ❌ BAD: No Bridge - Class explosion from combining two dimensions in one hierarchy

class BasicTVRemote {
  private on: boolean = false;
  private volume: number = 30;

  public togglePower(): void {
    this.on = !this.on;
  }

  public volumeUp(): void {
    this.volume = Math.min(100, this.volume + 10);
  }

  public volumeDown(): void {
    this.volume = Math.max(0, this.volume - 10);
  }

  public status(): string {
    const state = this.on ? 'ON' : 'OFF';
    return `TV is ${state}, volume: ${this.volume}`;
  }
}

class BasicRadioRemote {
  private on: boolean = false;
  private volume: number = 20;

  public togglePower(): void {
    this.on = !this.on;
  }

  public volumeUp(): void {
    this.volume = Math.min(100, this.volume + 10);
  }

  public volumeDown(): void {
    this.volume = Math.max(0, this.volume - 10);
  }

  public status(): string {
    const state = this.on ? 'ON' : 'OFF';
    return `Radio is ${state}, volume: ${this.volume}`;
  }
}

// Now we need an advanced remote... we have to duplicate for EVERY device
class AdvancedTVRemote {
  private on: boolean = false;
  private volume: number = 30;

  public togglePower(): void {
    this.on = !this.on;
  }

  public volumeUp(): void {
    this.volume = Math.min(100, this.volume + 10);
  }

  public volumeDown(): void {
    this.volume = Math.max(0, this.volume - 10);
  }

  public mute(): void {
    this.volume = 0;
  }

  public status(): string {
    const state = this.on ? 'ON' : 'OFF';
    return `TV is ${state}, volume: ${this.volume}`;
  }
}

class AdvancedRadioRemote {
  private on: boolean = false;
  private volume: number = 20;

  public togglePower(): void {
    this.on = !this.on;
  }

  public volumeUp(): void {
    this.volume = Math.min(100, this.volume + 10);
  }

  public volumeDown(): void {
    this.volume = Math.max(0, this.volume - 10);
  }

  public mute(): void {
    this.volume = 0;
  }

  public status(): string {
    const state = this.on ? 'ON' : 'OFF';
    return `Radio is ${state}, volume: ${this.volume}`;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Bridge (Class Explosion) ===\n');

  const tvRemote = new BasicTVRemote();
  tvRemote.togglePower();
  tvRemote.volumeUp();
  console.log(`Basic TV Remote: ${tvRemote.status()}`);

  const radioRemote = new BasicRadioRemote();
  radioRemote.togglePower();
  radioRemote.volumeUp();
  console.log(`Basic Radio Remote: ${radioRemote.status()}`);

  console.log('');

  const advTvRemote = new AdvancedTVRemote();
  advTvRemote.togglePower();
  advTvRemote.volumeUp();
  advTvRemote.mute();
  console.log(`Advanced TV Remote: ${advTvRemote.status()}`);

  const advRadioRemote = new AdvancedRadioRemote();
  advRadioRemote.togglePower();
  advRadioRemote.volumeUp();
  advRadioRemote.mute();
  console.log(`Advanced Radio Remote: ${advRadioRemote.status()}`);

  console.log('\n Problems with this approach:');
  console.log('  - 4 classes for just 2 remotes x 2 devices (grows as M x N)');
  console.log('  - Adding a new device requires duplicating ALL remote types');
  console.log('  - Adding a new remote requires duplicating ALL device logic');
  console.log('  - Massive code duplication across classes');
}

main();

export {};
