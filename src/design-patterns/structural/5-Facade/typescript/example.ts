// ✅ GOOD: Facade Pattern - Simplifies a complex subsystem behind a clean interface

// ===== COMPLEX SUBSYSTEM =====

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

// ===== FACADE =====

interface OrderRequest {
  productId: string;
  cardNumber: string;
  amount: number;
  address: string;
  email: string;
}

class OrderFacade {
  private inventory: InventoryService;
  private payment: PaymentService;
  private shipping: ShippingService;
  private notification: NotificationService;

  constructor() {
    this.inventory = new InventoryService();
    this.payment = new PaymentService();
    this.shipping = new ShippingService();
    this.notification = new NotificationService();
  }

  public placeOrder(request: OrderRequest): string {
    // Orchestrates the entire workflow in the correct order
    if (!this.inventory.check(request.productId)) {
      return 'FAILED: Product out of stock';
    }

    if (!this.payment.validate(request.cardNumber)) {
      return 'FAILED: Invalid payment method';
    }

    this.inventory.reserve(request.productId);
    const shippingCost = this.shipping.calculateCost(request.address);
    const txnId = this.payment.charge(request.cardNumber, request.amount + shippingCost);
    const shipId = this.shipping.schedule(request.address);
    const orderId = `order_${txnId}_${shipId}`;
    this.notification.sendConfirmation(request.email, orderId);

    return orderId;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Facade Pattern: E-Commerce Order System ===\n');

  const facade = new OrderFacade();

  console.log('--- Placing order via facade (single call) ---\n');
  const orderId = facade.placeOrder({
    productId: 'PHONE-123',
    cardNumber: '4111111111111234',
    amount: 899,
    address: '123 Main St, Springfield',
    email: 'user@example.com',
  });

  console.log(`\nOrder placed: ${orderId}`);

  console.log('\n Benefits of Facade Pattern:');
  console.log('  - Client calls one method instead of orchestrating 4 services');
  console.log('  - Subsystem initialization is handled by the facade');
  console.log('  - Correct execution order is guaranteed internally');
  console.log('  - Subsystem services can still be used directly for advanced cases');
}

main();

export {};
