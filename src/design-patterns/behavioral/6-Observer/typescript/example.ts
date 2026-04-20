// ✅ GOOD: Observer Pattern - Publisher broadcasts to any subscriber implementing the interface

// Observer interface that every subscriber must implement
interface PriceObserver {
  update(symbol: string, price: number): void;
}

// Subject / Publisher: manages subscribers and broadcasts updates
class StockPricePublisher {
  private observers: PriceObserver[];
  private prices: Map<string, number>;

  constructor() {
    this.observers = [];
    this.prices = new Map();
  }

  public subscribe(observer: PriceObserver): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: PriceObserver): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public setPrice(symbol: string, price: number): void {
    this.prices.set(symbol, price);
    this.notify(symbol, price);
  }

  private notify(symbol: string, price: number): void {
    for (const observer of this.observers) {
      observer.update(symbol, price);
    }
  }
}

// Concrete observers
class EmailSubscriber implements PriceObserver {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public update(symbol: string, price: number): void {
    console.log(`[Email to ${this.email}] ${symbol} is now $${price.toFixed(2)}`);
  }
}

class SmsSubscriber implements PriceObserver {
  private phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }

  public update(symbol: string, price: number): void {
    console.log(`[SMS to ${this.phone}] ${symbol}: $${price.toFixed(2)}`);
  }
}

// Adding a new subscriber type requires zero changes to the publisher
class PushNotificationSubscriber implements PriceObserver {
  private deviceId: string;

  constructor(deviceId: string) {
    this.deviceId = deviceId;
  }

  public update(symbol: string, price: number): void {
    console.log(`[Push to device ${this.deviceId}] ${symbol} -> $${price.toFixed(2)}`);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Observer Pattern: Stock Price Publisher ===\n');

  const publisher = new StockPricePublisher();

  const email = new EmailSubscriber('trader@example.com');
  const sms = new SmsSubscriber('+1-555-0100');
  const push = new PushNotificationSubscriber('device-42');

  publisher.subscribe(email);
  publisher.subscribe(sms);
  publisher.subscribe(push);

  console.log('--- AAPL price update ---');
  publisher.setPrice('AAPL', 189.5);

  console.log('');
  console.log('--- GOOG price update ---');
  publisher.setPrice('GOOG', 2750.25);

  console.log('');
  console.log('--- SMS subscriber unsubscribes ---');
  publisher.unsubscribe(sms);

  console.log('');
  console.log('--- AAPL price update (SMS should not receive) ---');
  publisher.setPrice('AAPL', 190.1);

  console.log('\n Benefits of Observer Pattern:');
  console.log('  - Publisher does not know concrete subscriber classes');
  console.log('  - New subscriber types are added without touching the publisher');
  console.log('  - Subscribers can join or leave at runtime');
  console.log('  - One state change is broadcast to everyone who cares');
  console.log('  - Follows Open/Closed and Dependency Inversion principles');
}

main();

export {};
