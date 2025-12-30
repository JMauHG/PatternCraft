// ✅ GOOD: Builder Pattern - Constructs complex objects step by step

// A PaymentIntent-like object (simplified, inspired by Stripe)
class PaymentIntent {
  amount!: number;
  currency!: string;
  paymentMethodTypes: string[] = [];
  metadata: Record<string, string> = {};
}

// The Builder class
class PaymentIntentBuilder {
  private intent: PaymentIntent;

  constructor() {
    this.intent = new PaymentIntent();
  }

  setAmount(amount: number): PaymentIntentBuilder {
    this.intent.amount = amount;
    return this;
  }

  setCurrency(currency: string): PaymentIntentBuilder {
    this.intent.currency = currency;
    return this;
  }

  addPaymentMethod(type: string): PaymentIntentBuilder {
    this.intent.paymentMethodTypes.push(type);
    return this;
  }

  addMetadata(key: string, value: string): PaymentIntentBuilder {
    this.intent.metadata[key] = value;
    return this;
  }

  build(): PaymentIntent {
    return this.intent;
  }
}

// The Director: defines recipes for different payment flows
class PaymentIntentDirector {
  constructor(private builder: PaymentIntentBuilder) {}

  // Example: Create a BNPL-ready PaymentIntent (Affirm, Klarna, Afterpay)
  buildBNPLPayment(amount: number): PaymentIntent {
    return this.builder
      .setAmount(amount)
      .setCurrency('usd')
      .addPaymentMethod('affirm')
      .addPaymentMethod('klarna')
      .addPaymentMethod('afterpay_clearpay')
      .build();
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Builder Pattern: PaymentIntent Builder ===\n');

  // Using Builder directly (fluent interface)
  const customPayment = new PaymentIntentBuilder()
    .setAmount(5000)
    .setCurrency('usd')
    .addPaymentMethod('card')
    .addMetadata('orderId', 'ORD-123')
    .addMetadata('userId', 'USR-456')
    .build();

  // Using Director for predefined configurations
  const bnplPayment = new PaymentIntentDirector(new PaymentIntentBuilder()).buildBNPLPayment(15000);

  console.log('\n Benefits of Builder Pattern:');
  console.log('  - Fluent interface makes code readable');
  console.log('  - Complex object construction is encapsulated');
  console.log('  - Easy to add optional parameters');
  console.log('  - Director provides reusable "recipes"');
  console.log('  - Same builder can create different configurations');
}

main();

export {};
