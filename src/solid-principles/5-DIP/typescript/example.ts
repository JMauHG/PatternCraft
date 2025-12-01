// ✅ Abstraction (interface)
// Both high-level and low-level modules depend on this
interface EmailSender {
  send(to: string, subject: string, body: string): Promise<void>;
}

// ✅ Low-level module 1: SMTP implementation
class SmtpEmailSender implements EmailSender {
  async send(to: string, subject: string, body: string): Promise<void> {
    console.log(`[SMTP] Sending to ${to}`);
    console.log(`       Subject: ${subject}`);
    console.log(`       Body: ${body}`);
  }
}

// ✅ Low-level module 2: Resend API implementation
class ResendEmailSender implements EmailSender {
  async send(to: string, subject: string, body: string): Promise<void> {
    console.log(`[Resend API] Sending to ${to}`);
    console.log(`             Subject: ${subject}`);
    console.log(`             Body: ${body}`);
  }
}

// ✅ Low-level module 3: SendGrid implementation
class SendGridEmailSender implements EmailSender {
  async send(to: string, subject: string, body: string): Promise<void> {
    console.log(`[SendGrid] Sending to ${to}`);
    console.log(`           Subject: ${subject}`);
    console.log(`           Body: ${body}`);
  }
}

// ✅ High-level module depends on ABSTRACTION, not concrete implementations
class Notifier {
  // Receives abstraction via constructor (Dependency Injection)
  constructor(private sender: EmailSender) {}

  async welcome(userEmail: string): Promise<void> {
    await this.sender.send(
      userEmail,
      'Welcome!',
      'Hello! Thanks for joining us.'
    );
  }

  async resetPassword(userEmail: string, token: string): Promise<void> {
    await this.sender.send(
      userEmail,
      'Password Reset',
      `Click here to reset: https://app.com/reset?token=${token}`
    );
  }

  async orderConfirmation(userEmail: string, orderId: string): Promise<void> {
    await this.sender.send(
      userEmail,
      `Order ${orderId} Confirmed`,
      `Your order ${orderId} has been confirmed and will ship soon.`
    );
  }
}

// ============ DEMO ============

async function main() {
  console.log('=== DIP - Dependency Inversion Principle Example: Notifier (high-level) depends on EmailSender (abstraction) not on concrete implementations ===\n');

  const sendgridNotifier = new Notifier(new SendGridEmailSender());
  await sendgridNotifier.welcome('newuser@company.com');

  const smtpNotifier = new Notifier(new SmtpEmailSender());
  await smtpNotifier.resetPassword('user@example.com', 'abc123');

  const resendNotifier = new Notifier(new ResendEmailSender());
  await resendNotifier.orderConfirmation('customer@shop.com', 'ORD-9876');

  console.log('\n✅ Benefits of DIP:');
  console.log('  - Notifier never changes when switching email providers');
  console.log('  - Easy to test with mock implementations');
  console.log('  - Can swap providers based on environment');
  console.log('  - High-level business logic is protected from infrastructure changes');
}

main();

export {};