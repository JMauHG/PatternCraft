# Singleton Pattern

## Definition

Singleton guarantees that a class has only one instance and provides a global access point to it.

**Analogy:** A country can have only one official government.

**Real-world use**: An application should only have one connection to the database.

## Why is it important?

- **Controlled access:** Ensures only one instance exists throughout the application
- **Global access point:** Provides a single point of access to that instance
- **Lazy initialization:** Instance is created only when first needed
- **Resource management:** Perfect for managing shared resources (database connections, loggers, config)

## How to Implement Singleton

1. **Make the constructor private** to prevent direct instantiation
2. **Create a static method** that acts as a constructor (usually `getInstance()`)
3. **Store the instance** in a private static field
4. **Return the existing instance** if it already exists, or create a new one

## When to Use

- Database connections
- Logger instances
- Configuration managers
- Cache managers
- Thread pools

## Signs of Misuse

- Using Singleton just to avoid passing dependencies (use Dependency Injection instead)
- Making everything a Singleton "just in case"
- Singleton with mutable state that causes hidden dependencies
- Difficulty testing due to global state

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/creational/1-Singleton/typescript/anti-example.ts
npx ts-node src/design-patterns/creational/1-Singleton/typescript/example.ts
```
