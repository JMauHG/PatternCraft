// ✅ Abstraction (interface)
interface PaymentGateway {
  name: string;
  pay(amountCents: number): Promise<void>;
}

// ✅ Implementation 1: Stripe
class StripeGateway implements PaymentGateway {
  name = 'Stripe';

  async pay(amount: number): Promise<void> {
    console.log(`[Stripe] Processing payment of $${(amount / 100).toFixed(2)}`);
  }
}

// ✅ Implementation 2: PayPal
class PaypalGateway implements PaymentGateway {
  name = 'PayPal';

  async pay(amount: number): Promise<void> {
    console.log(`[PayPal] Processing payment of $${(amount / 100).toFixed(2)}`);
  }
}

// ✅ The client class is CLOSED to modification
// It depends on the abstraction (PaymentGateway), not concrete implementations
class Checkout {
  constructor(private gateway: PaymentGateway) {}

  async process(totalCents: number): Promise<void> {
    console.log(`Processing checkout with ${this.gateway.name}...`);
    await this.gateway.pay(totalCents);
    console.log('Checkout completed!\n');
  }
}

// ============ EXTENSION ============

// ✅ Adding a new payment provider WITHOUT modifying Checkout
class MercadoPagoGateway implements PaymentGateway {
  name = 'MercadoPago';

  async pay(amount: number): Promise<void> {
    console.log(`[MercadoPago] Procesando pago de $${(amount / 100).toFixed(2)}`);
  }
}

// ✅ Another extension: Crypto payments
class CryptoGateway implements PaymentGateway {
  name = 'Crypto';

  async pay(amount: number): Promise<void> {
    const btcAmount = amount / 100 / 43000; // Simulated BTC conversion
    console.log(`[Crypto] Processing ${btcAmount.toFixed(6)} BTC`);
  }
}

// ============ DEMO ============

async function main() {
  console.log('=== OCP Good Example: Open to add new payment gateways in new classes ===\n');
  const amount = 9999; // $99.99 in cents

  // Using different payment gateways with the SAME Checkout class
  const checkoutStripe = new Checkout(new StripeGateway());
  await checkoutStripe.process(amount);

  const checkoutPaypal = new Checkout(new PaypalGateway());
  await checkoutPaypal.process(amount);

  // New gateways added WITHOUT modifying Checkout
  const checkoutMP = new Checkout(new MercadoPagoGateway());
  await checkoutMP.process(amount);

  const checkoutCrypto = new Checkout(new CryptoGateway());
  await checkoutCrypto.process(amount);

  console.log('✅ Four different payment methods, ZERO changes to Checkout!');
  console.log('This is the Open/Closed Principle in action.');
}

main();

export {};