// ❌ Low-level module: SMTP implementation
class SmtpEmailSender {
  send(to: string, subject: string, body: string): void {
    console.log(`[SMTP] Sending to ${to}`);
    console.log(`       Subject: ${subject}`);
    console.log(`       Body: ${body}`);
  }
}

// ❌ Low-level module: SendGrid implementation
class SendGridEmailSender {
  send(to: string, subject: string, body: string): void {
    console.log(`[SendGrid] Sending to ${to}`);
    console.log(`           Subject: ${subject}`);
    console.log(`           Body: ${body}`);
  }
}

// ❌ High-level module DIRECTLY depends on low-level modules
// This violates DIP: high-level class instantiates low-level classes with "new"
class Notifier {
  private smtpSender: SmtpEmailSender;
  private sendGridSender: SendGridEmailSender;

  constructor() {
    // ❌ Direct instantiation of concrete implementations
    this.smtpSender = new SmtpEmailSender();
    this.sendGridSender = new SendGridEmailSender();
  }

  welcome(userEmail: string, provider: 'smtp' | 'sendgrid'): void {
    // ❌ Conditional logic to choose implementation
    if (provider === 'smtp') {
      this.smtpSender.send(userEmail, 'Welcome!', 'Hello! Thanks for joining us.');
    } else {
      this.sendGridSender.send(userEmail, 'Welcome!', 'Hello! Thanks for joining us.');
    }
  }

  resetPassword(userEmail: string, token: string, provider: 'smtp' | 'sendgrid'): void {
    if (provider === 'smtp') {
      this.smtpSender.send(
        userEmail,
        'Password Reset',
        `Click here to reset: https://app.com/reset?token=${token}`
      );
    } else {
      this.sendGridSender.send(
        userEmail,
        'Password Reset',
        `Click here to reset: https://app.com/reset?token=${token}`
      );
    }
  }

  orderConfirmation(userEmail: string, orderId: string, provider: 'smtp' | 'sendgrid'): void {
    if (provider === 'smtp') {
      this.smtpSender.send(
        userEmail,
        `Order ${orderId} Confirmed`,
        `Your order ${orderId} has been confirmed and will ship soon.`
      );
    } else {
      this.sendGridSender.send(
        userEmail,
        `Order ${orderId} Confirmed`,
        `Your order ${orderId} has been confirmed and will ship soon.`
      );
    }
  }
}

// ============ DEMO ============

function main() {
  console.log('=== DIP Violation: Notifier directly depends on concrete email implementations ===\n');

  const notifier = new Notifier();

  notifier.welcome('newuser@company.com', 'sendgrid');
  notifier.resetPassword('user@example.com', 'abc123', 'smtp');
  notifier.orderConfirmation('customer@shop.com', 'ORD-9876', 'sendgrid');

  console.log('\n❌ Problems with this approach:');
  console.log('  - Adding a new provider (e.g., Resend) requires modifying Notifier');
  console.log('  - Cannot easily mock email senders for testing');
  console.log('  - High-level business logic is coupled to infrastructure details');
  console.log('  - Every method needs provider conditional logic');
}

main();

export {};