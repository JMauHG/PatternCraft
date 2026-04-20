// ✅ GOOD: Strategy Pattern - Swappable pricing strategies at runtime

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

// Strategy interface — contract shared by all pricing algorithms
interface PricingStrategy {
  getName(): string;
  calculateTotal(items: CartItem[]): number;
}

// Regular pricing: no discount, full price on every item
class RegularPricing implements PricingStrategy {
  public getName(): string {
    return 'Regular';
  }

  public calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

// Seasonal pricing: flat 20% off the whole cart
class SeasonalPricing implements PricingStrategy {
  private readonly discount: number = 0.2;

  public getName(): string {
    return 'Seasonal (-20%)';
  }

  public calculateTotal(items: CartItem[]): number {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal * (1 - this.discount);
  }
}

// VIP pricing: 15% off, plus free item if cart is above a threshold
class VipPricing implements PricingStrategy {
  private readonly discount: number = 0.15;
  private readonly freeItemThreshold: number = 100;

  public getName(): string {
    return 'VIP (-15%, cheapest free over $100)';
  }

  public calculateTotal(items: CartItem[]): number {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discounted = subtotal * (1 - this.discount);

    if (subtotal >= this.freeItemThreshold && items.length > 0) {
      const cheapest = Math.min(...items.map((item) => item.price));
      return discounted - cheapest;
    }

    return discounted;
  }
}

// Context — the checkout flow delegates total calculation to the current strategy
class Checkout {
  private strategy: PricingStrategy;

  constructor(strategy: PricingStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: PricingStrategy): void {
    this.strategy = strategy;
  }

  public process(items: CartItem[]): void {
    console.log(`Applying pricing: ${this.strategy.getName()}`);
    items.forEach((item) => {
      console.log(`  - ${item.name} x${item.quantity} @ $${item.price.toFixed(2)}`);
    });
    const total = this.strategy.calculateTotal(items);
    console.log(`  Total: $${total.toFixed(2)}`);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Strategy Pattern: Checkout Pricing ===\n');

  const cart: CartItem[] = [
    { name: 'Headphones', price: 80, quantity: 1 },
    { name: 'USB Cable', price: 15, quantity: 2 },
    { name: 'Mouse Pad', price: 12, quantity: 1 },
  ];

  const checkout = new Checkout(new RegularPricing());
  checkout.process(cart);

  console.log('');
  checkout.setStrategy(new SeasonalPricing());
  checkout.process(cart);

  console.log('');
  checkout.setStrategy(new VipPricing());
  checkout.process(cart);

  console.log('\n Benefits of Strategy Pattern:');
  console.log('  - New pricing rules can be added without modifying Checkout');
  console.log('  - Each pricing algorithm is isolated and independently testable');
  console.log('  - No sprawling switch/if chain to pick the algorithm');
  console.log('  - Strategies are swappable at runtime (e.g., user becomes VIP)');
  console.log('  - Follows the Open/Closed Principle');
}

main();

export {};
