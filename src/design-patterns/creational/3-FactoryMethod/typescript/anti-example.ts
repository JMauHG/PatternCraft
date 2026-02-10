// ❌ BAD: No Factory Method - Direct instantiation with duplicated logic

// ===== Product Classes =====
class User {
  constructor(public id: number, public name: string) {}

  display(): void {
    console.log(`User { id: ${this.id}, name: "${this.name}" }`);
  }
}

class Order {
  constructor(public id: number, public total: number) {}

  display(): void {
    console.log(`Order { id: ${this.id}, total: $${this.total} }`);
  }
}

// ===== Client Code - No abstraction =====
class DatabaseClient {
  // Hydration logic is duplicated for each model type
  hydrateUser(row: any): User {
    console.log('✓ Hydrating user...');
    // Imagine validation, type checking, etc. here
    return new User(row.id, row.name);
  }

  hydrateOrder(row: any): Order {
    console.log('✓ Hydrating order...');
    // Same validation logic duplicated!
    return new Order(row.id, row.total);
  }

  // Every new model needs a new hydrate method
  // hydrateProduct(row: any): Product { ... }
  // hydrateCategory(row: any): Category { ... }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Direct Model Instantiation ===\n');

  const db = new DatabaseClient();

  // Simulate database rows
  const userRow = { id: 1, name: 'Mauricio' };
  const orderRow = { id: 99, total: 1500 };

  console.log('Creating User model from database row...');
  const user = db.hydrateUser(userRow);
  user.display();

  console.log('\nCreating Order model from database row...');
  const order = db.hydrateOrder(orderRow);
  order.display();

  console.log('\n Problems with this approach:');
  console.log('  - Hydration logic duplicated in each method');
  console.log('  - Must modify DatabaseClient to add new models');
  console.log('  - Violates Open/Closed Principle');
  console.log('  - No shared abstraction for model creation');
  console.log('  - Hard to test and maintain as models grow');
}

main();

export {};
