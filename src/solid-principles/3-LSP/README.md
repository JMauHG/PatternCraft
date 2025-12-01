# LSP - Liskov Substitution Principle

## Definition

If a child class inherits from a parent class, it should be able to be used in place of the parent class without breaking anything.
In simpler terms: If class B is a subtype of class A, then we should be able to use B anywhere we use A without unexpected behavior.

## Why is it important?

- **Predictability:** Code using base types behaves consistently with subtypes
- **Polymorphism:** Enables proper use of inheritance and interfaces
- **Reliability:** Prevents unexpected runtime errors
- **Design quality:** Forces better hierarchy design

## How to Achieve LSP

1. **Design by contract** - subtypes must honor the parent's contract (preconditions, postconditions, invariants)
2. **Favor composition over inheritance** when behavior differs significantly
3. **Use interfaces** to define expected behavior rather than relying on class inheritance
4. **Ensure subtypes don't strengthen preconditions** or weaken postconditions

## Signs of LSP Violation

- Subclass methods throw exceptions not thrown by the parent
- Subclass overrides a method to do nothing or return null/empty
- Code checks the type of an object before calling a method (e.g., `instanceof` checks)
- Subclass removes or ignores inherited behavior

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/solid-principles/3-LSP/typescript/anti-example.ts
npx ts-node src/solid-principles/3-LSP/typescript/example.ts
```
