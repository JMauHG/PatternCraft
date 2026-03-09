// ✅ GOOD: Composite Pattern - Treats individual objects and compositions uniformly

// Component interface shared by leaves and containers
interface OrderItem {
  getName(): string;
  getPrice(): number;
}

// Leaf: a single product with a direct price
class Product implements OrderItem {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }
}

// Composite: a box that can contain products or other boxes
class Box implements OrderItem {
  private name: string;
  private children: OrderItem[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public add(item: OrderItem): void {
    this.children.push(item);
  }

  public remove(item: OrderItem): void {
    const index = this.children.indexOf(item);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  public getName(): string {
    return this.name;
  }

  // Delegates to children and sums their prices recursively
  public getPrice(): number {
    return this.children.reduce((total, child) => total + child.getPrice(), 0);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Composite Pattern: Order with Products and Boxes ===\n');

  // Individual products
  const phone = new Product('Phone', 899);
  const charger = new Product('Charger', 29);
  const case_ = new Product('Phone Case', 19);
  const headphones = new Product('Headphones', 199);
  const manual = new Product('Manual', 0);

  // Small box with accessories
  const accessoriesBox = new Box('Accessories Box');
  accessoriesBox.add(charger);
  accessoriesBox.add(case_);
  accessoriesBox.add(headphones);

  // Main package with the phone, accessories box, and manual
  const mainPackage = new Box('Main Package');
  mainPackage.add(phone);
  mainPackage.add(accessoriesBox);
  mainPackage.add(manual);

  // Client code treats everything uniformly
  console.log(`${phone.getName()}: $${phone.getPrice()}`);
  console.log(`${accessoriesBox.getName()}: $${accessoriesBox.getPrice()}`);
  console.log(`${mainPackage.getName()}: $${mainPackage.getPrice()}`);

  console.log('');

  // We can also nest deeper
  const warehouse = new Box('Warehouse Shipment');
  warehouse.add(mainPackage);
  warehouse.add(new Product('Gift Card', 50));

  console.log(`${warehouse.getName()}: $${warehouse.getPrice()}`);

  console.log('\n Benefits of Composite Pattern:');
  console.log('  - getPrice() works the same on a Product or a Box of any depth');
  console.log('  - New item types can be added without changing existing code');
  console.log('  - No type-checking needed — client code uses the same interface');
  console.log('  - Tree structure can be composed dynamically at runtime');
}

main();

export {};
