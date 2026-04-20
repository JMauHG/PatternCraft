// ❌ BAD: No Observer - Publisher hardcoded with concrete subscriber references

class EmailSubscriber {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public sendEmail(symbol: string, price: number): void {
    console.log(`[Email to ${this.email}] ${symbol} is now $${price.toFixed(2)}`);
  }
}

class SmsSubscriber {
  private phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }

  public sendSms(symbol: string, price: number): void {
    console.log(`[SMS to ${this.phone}] ${symbol}: $${price.toFixed(2)}`);
  }
}

// Publisher knows every concrete subscriber type and calls them directly
class StockPricePublisher {
  private emailSubscriber: EmailSubscriber | null;
  private smsSubscriber: SmsSubscriber | null;

  constructor() {
    this.emailSubscriber = null;
    this.smsSubscriber = null;
  }

  public setEmailSubscriber(subscriber: EmailSubscriber): void {
    this.emailSubscriber = subscriber;
  }

  public setSmsSubscriber(subscriber: SmsSubscriber): void {
    this.smsSubscriber = subscriber;
  }

  public setPrice(symbol: string, price: number): void {
    // Publisher must know each subscriber's specific method name
    if (this.emailSubscriber) {
      this.emailSubscriber.sendEmail(symbol, price);
    }
    if (this.smsSubscriber) {
      this.smsSubscriber.sendSms(symbol, price);
    }
    // Adding push notifications would require modifying this class AGAIN
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Hardcoded Subscribers ===\n');

  const publisher = new StockPricePublisher();
  publisher.setEmailSubscriber(new EmailSubscriber('trader@example.com'));
  publisher.setSmsSubscriber(new SmsSubscriber('+1-555-0100'));

  console.log('--- AAPL price update ---');
  publisher.setPrice('AAPL', 189.5);

  console.log('');
  console.log('--- GOOG price update ---');
  publisher.setPrice('GOOG', 2750.25);

  // To add push notifications, we would need to:
  //   1. Add a new field on the publisher
  //   2. Add a new setter method
  //   3. Add a new branch inside setPrice
  // That is a direct violation of the Open/Closed Principle.

  console.log('\n Problems with this approach:');
  console.log('  - Publisher is tightly coupled to every concrete subscriber class');
  console.log('  - Adding a new subscriber type requires modifying the publisher');
  console.log('  - Each subscriber has a different method name — no uniform contract');
  console.log('  - Cannot support arbitrary numbers of subscribers of the same type');
  console.log('  - Violates Open/Closed and Dependency Inversion principles');
}

main();

export {};
