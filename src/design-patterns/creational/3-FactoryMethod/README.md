# Factory Method Pattern

## Definition

Factory Method allows a superclass to create objects, while subclasses can alter the type of objects that will be created. Instead of calling the `new` operator to build objects directly, a special factory method is invoked.

**Mnemonics:** Add Sea Logistic to implementation that supports only Road Logistic.

**Real-world use:** Basically all ORMs use this pattern to create different model instances. ORMs do not explicitly name their code according to the design pattern, but the functionality is the same (e.g., Sequelize, TypeORM, Prisma).

## Why is it important?

- **Decouples object creation:** Client code doesn't need to know the exact class being instantiated
- **Extensibility:** New product types can be added without modifying existing code
- **Single Responsibility:** Object creation logic is separated from business logic
- **Open/Closed Principle:** Open for extension (new factories), closed for modification

## Key Components

### Product
The interface or abstract class that defines what objects the factory method creates.

### Concrete Product
Specific implementations of the Product interface (e.g., `User`, `Order`).

### Creator (Factory)
Declares the factory method that returns Product objects. May also contain core business logic that uses products.

### Concrete Creator
Overrides the factory method to return specific Concrete Product instances.

## How to Implement Factory Method

1. **Define a Product interface/class** that all created objects will implement
2. **Create Concrete Product classes** that implement the Product interface
3. **Create an abstract Creator class** with the factory method (can be abstract or with default implementation)
4. **Implement Concrete Creators** that override the factory method to return specific products
5. **Use the Creator's methods** which internally use the factory method

## When to Use

- When you don't know exact types/classes of objects your code will work with
- When you want to provide users a way to extend internal components
- When you want to save system resources by reusing existing objects (pooling)
- Object creation requires complex setup that should be encapsulated
- ORMs, Plugin systems, Cross-platform UI frameworks

## Signs of Misuse

- Using Factory Method for simple object creation that doesn't need abstraction
- Creating too many factory hierarchies for trivial variations
- Factory that creates unrelated objects (violates Single Responsibility)
- Using when object creation is stable and unlikely to change

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/creational/3-FactoryMethod/typescript/anti-example.ts
npx ts-node src/design-patterns/creational/3-FactoryMethod/typescript/example.ts
```
