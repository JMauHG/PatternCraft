// ❌ BAD: No Builder Pattern - Complex object construction is messy

// PaymentIntent with a telescoping constructor
class PaymentIntent {
  amount: number;
  currency: string;
  paymentMethodTypes: string[];
  metadata: Record<string, string>;

  // Telescoping constructor - hard to read and use
  constructor(
    amount: number,
    currency: string,
    paymentMethodTypes?: string[],
    metadata?: Record<string, string>
  ) {
    this.amount = amount;
    this.currency = currency;
    this.paymentMethodTypes = paymentMethodTypes || [];
    this.metadata = metadata || {};
  }
}

// Helper functions to create common payment types (messy alternative to Director)
function createBNPLPayment(amount: number): PaymentIntent {
  return new PaymentIntent(amount, 'usd', ['affirm', 'klarna', 'afterpay_clearpay'], {});
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Builder Pattern ===\n');

  // Problem 1: Telescoping constructor - what do these parameters mean?
  // Problem 2: Adding more payment methods requires knowing internal structure
  const payment2 = new PaymentIntent(
    15000,
    'usd',
    ['affirm', 'klarna', 'afterpay_clearpay'], // Must pass entire array at once
    { orderId: 'ORD-456', userId: 'USR-789' }
  );

  // Problem 3: Modifying after construction exposes internal state
  const payment3 = new PaymentIntent(2500, 'eur');
  payment3.paymentMethodTypes.push('card'); // Direct mutation!
  payment3.metadata['region'] = 'EU'; // Direct mutation!

  // Problem 4: Helper functions are scattered and inconsistent
  const bnplPayment = createBNPLPayment(10000);

  console.log(' Problems with this approach:');
  console.log('  - Constructor parameters are confusing (what is 5000?)');
  console.log('  - Cannot build object incrementally');
  console.log('  - Must know internal structure to modify');
  console.log('  - Direct mutations break encapsulation');
  console.log('  - Helper functions are limited and scattered');
  console.log('  - No fluent interface for readability');
}

main();

export {};
