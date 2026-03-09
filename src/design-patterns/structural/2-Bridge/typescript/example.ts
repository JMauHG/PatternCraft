// ✅ GOOD: Bridge Pattern - Separates abstraction from implementation

// Implementation interface — defines primitive operations for devices
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(volume: number): void;
  getName(): string;
}

// Concrete implementation: TV
class TV implements Device {
  private on: boolean = false;
  private volume: number = 30;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
  }

  public disable(): void {
    this.on = false;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(100, volume));
  }

  public getName(): string {
    return 'TV';
  }
}

// Concrete implementation: Radio
class Radio implements Device {
  private on: boolean = false;
  private volume: number = 20;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
  }

  public disable(): void {
    this.on = false;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(100, volume));
  }

  public getName(): string {
    return 'Radio';
  }
}

// Abstraction: RemoteControl holds a reference to a Device
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  public volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  public volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  public status(): string {
    const state = this.device.isEnabled() ? 'ON' : 'OFF';
    return `${this.device.getName()} is ${state}, volume: ${this.device.getVolume()}`;
  }
}

// Refined abstraction: adds mute functionality
class AdvancedRemoteControl extends RemoteControl {
  public mute(): void {
    this.device.setVolume(0);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Bridge Pattern: Remote Controls + Devices ===\n');

  // Basic remote with TV
  const tv = new TV();
  const remote = new RemoteControl(tv);

  console.log('--- Basic Remote + TV ---');
  remote.togglePower();
  remote.volumeUp();
  console.log(remote.status());

  console.log('');

  // Advanced remote with Radio
  const radio = new Radio();
  const advancedRemote = new AdvancedRemoteControl(radio);

  console.log('--- Advanced Remote + Radio ---');
  advancedRemote.togglePower();
  advancedRemote.volumeUp();
  console.log(advancedRemote.status());
  advancedRemote.mute();
  console.log(`After mute: ${advancedRemote.status()}`);

  console.log('');

  // Same advanced remote works with TV too
  const advancedTvRemote = new AdvancedRemoteControl(tv);
  console.log('--- Advanced Remote + TV (reusing same TV) ---');
  advancedTvRemote.volumeUp();
  console.log(advancedTvRemote.status());

  console.log('\n Benefits of Bridge Pattern:');
  console.log('  - Remote controls and devices vary independently');
  console.log('  - Adding a new device does not require changing any remote');
  console.log('  - Adding a new remote does not require changing any device');
  console.log('  - Avoids class explosion (no TVRemote, RadioRemote, AdvancedTVRemote, etc.)');
}

main();

export {};
