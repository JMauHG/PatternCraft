// ❌ BAD: This class MUST be modified every time a new payment method is added
// It is NOT closed to modification

type PaymentType = 'stripe' | 'paypal' | 'mercadopago' | 'crypto';

class Checkout {
  // ❌ Every new payment method requires modifying this method
  async process(totalCents: number, paymentType: PaymentType): Promise<void> {
    console.log(`Processing checkout...`);

    // ❌ Growing switch statement - code smell!
    switch (paymentType) {
      case 'stripe':
        console.log(`[Stripe] Processing payment of $${(totalCents / 100).toFixed(2)}`);
        break;

      case 'paypal':
        console.log(`[PayPal] Processing payment of $${(totalCents / 100).toFixed(2)}`);
        break;

      case 'mercadopago':
        console.log(`[MercadoPago] Procesando pago de $${(totalCents / 100).toFixed(2)}`);
        break;

      case 'crypto':
        const btcAmount = totalCents / 100 / 43000;
        console.log(`[Crypto] Processing ${btcAmount.toFixed(6)} BTC`);
        break;

      default:
        throw new Error(`Unknown payment type: ${paymentType}`);
    }

    console.log('Checkout completed!\n');
  }
}

// ============ DEMO ============

async function main() {
  console.log('=== OCP Anti-Example: Checkout with Switch Statement ===\n');

  const checkout = new Checkout();
  const amount = 9999; // $99.99 in cents

  await checkout.process(amount, 'stripe');
  await checkout.process(amount, 'paypal');
  await checkout.process(amount, 'mercadopago');
  await checkout.process(amount, 'crypto');

  console.log('⚠️  Problems with this approach:');
  console.log('  - Adding a new payment method requires modifying Checkout');
  console.log('  - Switch statement grows with each new payment type');
  console.log('  - All payment logic is coupled in one class');
  console.log('  - Violates Open/Closed: not CLOSED to modification');
  console.log('  - Risk of breaking existing payments when adding new ones');
}

main();

export {};
