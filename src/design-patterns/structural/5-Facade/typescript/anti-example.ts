// ❌ BAD: No Facade - Client must know and orchestrate every subsystem manually

class InventoryService {
  public check(productId: string): boolean {
    console.log(`  [Inventory] Checking stock for product ${productId}`);
    return true;
  }

  public reserve(productId: string): void {
    console.log(`  [Inventory] Reserved product ${productId}`);
  }
}

class PaymentService {
  public validate(cardNumber: string): boolean {
    console.log(`  [Payment] Validating card ending in ${cardNumber.slice(-4)}`);
    return true;
  }

  public charge(cardNumber: string, amount: number): string {
    console.log(`  [Payment] Charged $${amount} to card ending in ${cardNumber.slice(-4)}`);
    return `txn_${Date.now()}`;
  }
}

class ShippingService {
  public calculateCost(address: string): number {
    console.log(`  [Shipping] Calculating cost for "${address}"`);
    return 9.99;
  }

  public schedule(address: string): string {
    console.log(`  [Shipping] Scheduled delivery to "${address}"`);
    return `ship_${Date.now()}`;
  }
}

class NotificationService {
  public sendConfirmation(email: string, orderId: string): void {
    console.log(`  [Notification] Sent confirmation for order ${orderId} to ${email}`);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Facade (Client Orchestrates Everything) ===\n');

  // Client must create every service manually
  const inventory = new InventoryService();
  const payment = new PaymentService();
  const shipping = new ShippingService();
  const notification = new NotificationService();

  // Client must know the correct order of operations
  const productId = 'PHONE-123';
  const cardNumber = '4111111111111234';
  const amount = 899;
  const address = '123 Main St, Springfield';
  const email = 'user@example.com';

  console.log('--- Client manually orchestrating all services ---\n');

  if (!inventory.check(productId)) {
    console.log('Product out of stock!');
    return;
  }

  if (!payment.validate(cardNumber)) {
    console.log('Invalid payment!');
    return;
  }

  // Client must remember to call these in the right order
  inventory.reserve(productId);
  const shippingCost = shipping.calculateCost(address);
  const txnId = payment.charge(cardNumber, amount + shippingCost);
  const shipId = shipping.schedule(address);
  const orderId = `order_${txnId}_${shipId}`;
  notification.sendConfirmation(email, orderId);

  console.log(`\nOrder placed: ${orderId}`);

  console.log('\n Problems with this approach:');
  console.log('  - Client is tightly coupled to 4 different service classes');
  console.log('  - Every caller must duplicate the same orchestration logic');
  console.log('  - Wrong execution order causes silent bugs (e.g., charge before validate)');
  console.log('  - Adding a new step requires updating every place that places an order');
}

main();

export {};
