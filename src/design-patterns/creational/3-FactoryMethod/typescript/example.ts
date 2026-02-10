// ✅ GOOD: Factory Method Pattern - Subclasses decide what objects to create

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

// ===== Creator (defines the factory method) =====
abstract class ModelFactory {
  // Factory Method: subclasses decide *what* model to instantiate
  abstract createModel(row: any): any;

  // Shared logic for all models (same as ORM hydration)
  hydrate(row: any) {
    const model = this.createModel(row);
    console.log(`✓ Model hydrated from row data`);
    return model;
  }
}

// ===== Concrete Creators =====
class UserFactory extends ModelFactory {
  createModel(row: any): User {
    return new User(row.id, row.name);
  }
}

class OrderFactory extends ModelFactory {
  createModel(row: any): Order {
    return new Order(row.id, row.total);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Factory Method Pattern: ORM Model Creation ===\n');

  // Simulate database rows
  const userRow = { id: 1, name: 'Mauricio' };
  const orderRow = { id: 99, total: 1500 };

  console.log('Creating User model from database row...');
  const userFactory = new UserFactory();
  const user = userFactory.hydrate(userRow);
  user.display();

  console.log('\nCreating Order model from database row...');
  const orderFactory = new OrderFactory();
  const order = orderFactory.hydrate(orderRow);
  order.display();

  console.log('\n Benefits of Factory Method Pattern:');
  console.log('  - Shared hydration logic in ModelFactory.hydrate()');
  console.log('  - Each factory decides which model to instantiate');
  console.log('  - Easy to add new models (e.g., ProductFactory)');
  console.log('  - Follows Open/Closed Principle (extend without modifying)');
  console.log('  - Real ORMs (Sequelize, TypeORM) use this approach');
}

main();

export {};
