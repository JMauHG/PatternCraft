# Bridge Pattern

## Definition

Bridge separates an abstraction from its implementation so that the two can vary independently. Instead of combining abstraction and implementation in one class hierarchy, you split them into two separate hierarchies connected by composition.

**Analogy:** Think of a TV remote control. The remote (abstraction) works with any device (implementation) — a TV, a radio, or a smart speaker. You can change the remote or the device independently without affecting the other.

**Real-world use:** A notification system where the delivery channel (email, SMS, push) is independent from the notification type (alert, reminder, promotion). Adding a new channel or a new notification type doesn't require modifying the other.

## Why is it important?

- **Decoupling:** Separates abstraction from implementation, allowing them to evolve independently
- **Single Responsibility:** Each hierarchy handles its own concern
- **Open/Closed Principle:** New abstractions and implementations can be added without modifying existing code
- **Avoids class explosion:** Prevents combinatorial growth of subclasses when two dimensions of variation exist

## How to Implement Bridge

1. **Identify the two dimensions** of variation in your classes (e.g., abstraction and platform)
2. **Define an implementation interface** with primitive operations the abstraction needs
3. **Create concrete implementations** for each variant of the implementation dimension
4. **Create an abstraction class** that holds a reference to the implementation interface
5. **Extend the abstraction** if needed with refined abstractions that add higher-level operations
6. **Inject the implementation** into the abstraction via the constructor (composition)

## When to Use

- You have a class that has two or more independent dimensions of variation
- You want to avoid a permanent binding between abstraction and implementation
- You need to switch implementations at runtime
- You want to share an implementation among multiple abstractions

## Signs of Misuse

- Using Bridge when there's only one dimension of variation (just use simple inheritance)
- Creating a Bridge for classes that are unlikely to change independently
- Over-abstracting simple scenarios that don't have combinatorial complexity
- Adding the pattern when a simple strategy or dependency injection would suffice

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/structural/2-Bridge/typescript/anti-example.ts
npx ts-node src/design-patterns/structural/2-Bridge/typescript/example.ts
```
