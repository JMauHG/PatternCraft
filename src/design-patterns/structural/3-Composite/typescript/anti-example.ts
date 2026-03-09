// ❌ BAD: No Composite - Manual type-checking and separate logic for each level

class Product {
  public name: string;
  public price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

class Box {
  public name: string;
  public products: Product[] = [];
  public boxes: Box[] = [];

  constructor(name: string) {
    this.name = name;
  }
}

// Client must know the exact structure and handle each level manually
function calculateBoxPrice(box: Box): number {
  let total = 0;

  for (const product of box.products) {
    total += product.price;
  }

  for (const innerBox of box.boxes) {
    // Must recursively handle boxes separately from products
    total += calculateBoxPrice(innerBox);
  }

  return total;
}

// Need a completely different function for calculating a single item
function calculateItemPrice(item: Product | Box): number {
  if (item instanceof Product) {
    return item.price;
  } else if (item instanceof Box) {
    return calculateBoxPrice(item);
  }
  return 0;
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Composite (Manual Type-Checking) ===\n');

  const phone = new Product('Phone', 899);
  const charger = new Product('Charger', 29);
  const case_ = new Product('Phone Case', 19);
  const headphones = new Product('Headphones', 199);
  const manual = new Product('Manual', 0);

  const accessoriesBox = new Box('Accessories Box');
  accessoriesBox.products.push(charger);
  accessoriesBox.products.push(case_);
  accessoriesBox.products.push(headphones);

  const mainPackage = new Box('Main Package');
  mainPackage.products.push(phone);
  mainPackage.products.push(manual);
  mainPackage.boxes.push(accessoriesBox);

  // Must use different logic depending on the type
  console.log(`${phone.name}: $${calculateItemPrice(phone)}`);
  console.log(`${accessoriesBox.name}: $${calculateItemPrice(accessoriesBox)}`);
  console.log(`${mainPackage.name}: $${calculateItemPrice(mainPackage)}`);

  console.log('');

  const warehouse = new Box('Warehouse Shipment');
  warehouse.boxes.push(mainPackage);
  warehouse.products.push(new Product('Gift Card', 50));

  console.log(`${warehouse.name}: $${calculateBoxPrice(warehouse)}`);

  console.log('\n Problems with this approach:');
  console.log('  - Client must know the internal structure of Box (products vs boxes)');
  console.log('  - instanceof checks make the code fragile and hard to extend');
  console.log('  - Adding a new item type requires modifying all calculation functions');
  console.log('  - No uniform interface — products and boxes are treated differently');
}

main();

export {};
