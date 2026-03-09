// ❌ BAD: No Decorator - Subclass explosion for every combination of behaviors

class EmailNotifier {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public send(message: string): void {
    console.log(`  Email to ${this.email}: "${message}"`);
  }
}

// One subclass per combination...
class EmailAndSMSNotifier extends EmailNotifier {
  private phone: string;

  constructor(email: string, phone: string) {
    super(email);
    this.phone = phone;
  }

  public send(message: string): void {
    super.send(message);
    console.log(`  SMS to ${this.phone}: "${message}"`);
  }
}

class EmailAndSlackNotifier extends EmailNotifier {
  private channel: string;

  constructor(email: string, channel: string) {
    super(email);
    this.channel = channel;
  }

  public send(message: string): void {
    super.send(message);
    console.log(`  Slack to #${this.channel}: "${message}"`);
  }
}

// Need Email + SMS + Slack? Another subclass...
class EmailSMSAndSlackNotifier extends EmailNotifier {
  private phone: string;
  private channel: string;

  constructor(email: string, phone: string, channel: string) {
    super(email);
    this.phone = phone;
    this.channel = channel;
  }

  public send(message: string): void {
    super.send(message);
    console.log(`  SMS to ${this.phone}: "${message}"`);
    console.log(`  Slack to #${this.channel}: "${message}"`);
  }
}

// Need Email + SMS + Slack + Push? Yet another subclass...
class EmailSMSSlackAndPushNotifier extends EmailNotifier {
  private phone: string;
  private channel: string;
  private deviceId: string;

  constructor(email: string, phone: string, channel: string, deviceId: string) {
    super(email);
    this.phone = phone;
    this.channel = channel;
    this.deviceId = deviceId;
  }

  public send(message: string): void {
    super.send(message);
    console.log(`  SMS to ${this.phone}: "${message}"`);
    console.log(`  Slack to #${this.channel}: "${message}"`);
    console.log(`  Push to device ${this.deviceId}: "${message}"`);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Decorator (Subclass Explosion) ===\n');

  console.log('--- Email only ---');
  const emailOnly = new EmailNotifier('user@example.com');
  emailOnly.send('Server is down');

  console.log('');

  console.log('--- Email + SMS ---');
  const withSMS = new EmailAndSMSNotifier('user@example.com', '+1-555-0123');
  withSMS.send('CPU usage at 90%');

  console.log('');

  console.log('--- Email + SMS + Slack + Push ---');
  const full = new EmailSMSSlackAndPushNotifier(
    'user@example.com',
    '+1-555-0123',
    'alerts',
    'device-abc'
  );
  full.send('Database unreachable');

  console.log('\n Problems with this approach:');
  console.log('  - 4 channels = up to 15 subclass combinations (2^N - 1)');
  console.log('  - Adding a new channel requires creating new subclasses for every combo');
  console.log('  - Cannot change notification channels at runtime');
  console.log('  - Duplicated logic across subclasses (SMS logic repeated in multiple classes)');
}

main();

export {};
