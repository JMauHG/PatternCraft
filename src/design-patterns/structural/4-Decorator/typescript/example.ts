// ✅ GOOD: Decorator Pattern - Stack behaviors dynamically via wrappers

// Component interface
interface Notifier {
  send(message: string): string[];
}

// Concrete component: base email notifier
class EmailNotifier implements Notifier {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public send(message: string): string[] {
    return [`Email to ${this.email}: "${message}"`];
  }
}

// Base decorator: implements Notifier and wraps another Notifier
class NotifierDecorator implements Notifier {
  protected wrapped: Notifier;

  constructor(wrapped: Notifier) {
    this.wrapped = wrapped;
  }

  public send(message: string): string[] {
    return this.wrapped.send(message);
  }
}

// Concrete decorator: adds SMS notification
class SMSDecorator extends NotifierDecorator {
  private phone: string;

  constructor(wrapped: Notifier, phone: string) {
    super(wrapped);
    this.phone = phone;
  }

  public send(message: string): string[] {
    const results = super.send(message);
    results.push(`SMS to ${this.phone}: "${message}"`);
    return results;
  }
}

// Concrete decorator: adds Slack notification
class SlackDecorator extends NotifierDecorator {
  private channel: string;

  constructor(wrapped: Notifier, channel: string) {
    super(wrapped);
    this.channel = channel;
  }

  public send(message: string): string[] {
    const results = super.send(message);
    results.push(`Slack to #${this.channel}: "${message}"`);
    return results;
  }
}

// Concrete decorator: adds push notification
class PushDecorator extends NotifierDecorator {
  private deviceId: string;

  constructor(wrapped: Notifier, deviceId: string) {
    super(wrapped);
    this.deviceId = deviceId;
  }

  public send(message: string): string[] {
    const results = super.send(message);
    results.push(`Push to device ${this.deviceId}: "${message}"`);
    return results;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Decorator Pattern: Notification System ===\n');

  // Just email
  const emailOnly = new EmailNotifier('user@example.com');
  console.log('--- Email only ---');
  emailOnly.send('Server is down').forEach((r) => console.log(`  ${r}`));

  console.log('');

  // Email + SMS (stack one decorator)
  const withSMS = new SMSDecorator(emailOnly, '+1-555-0123');
  console.log('--- Email + SMS ---');
  withSMS.send('CPU usage at 90%').forEach((r) => console.log(`  ${r}`));

  console.log('');

  // Email + SMS + Slack + Push (stack multiple decorators)
  const fullStack = new PushDecorator(
    new SlackDecorator(
      new SMSDecorator(emailOnly, '+1-555-0123'),
      'alerts'
    ),
    'device-abc'
  );
  console.log('--- Email + SMS + Slack + Push ---');
  fullStack.send('Database unreachable').forEach((r) => console.log(`  ${r}`));

  console.log('\n Benefits of Decorator Pattern:');
  console.log('  - Combine any notification channels without subclass explosion');
  console.log('  - Add or remove channels at runtime by composing wrappers');
  console.log('  - Each decorator has a single responsibility');
  console.log('  - New channels can be added without modifying existing code');
}

main();

export {};
