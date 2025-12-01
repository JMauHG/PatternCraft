# OCP - Open/Closed Principle

## Definition

Classes should be open to extension and closed to modification.

- Modification means changing the code of an existing class.
- Extension means adding new functionality.

## Why is it important?

- **Stability:** Existing, tested code remains unchanged
- **Reduces risk:** Less chance of introducing bugs in working code
- **Scalability:** Easy to add new features
- **Maintainability:** Clear separation between core logic and extensions

## How to Achieve OCP

1. **Use abstractions (interfaces/abstract classes)**
2. **Depend on abstractions, not concrete implementations**
3. **Use composition over inheritance**
4. **Apply patterns like Strategy, Template Method, or Factory**

## Signs of OCP Violation

- Adding a new feature requires modifying existing classes
- Large `switch` or `if-else` statements that check types
- Changing one feature breaks other features

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/solid-principles/2-OCP/typescript/anti-example.ts
npx ts-node src/solid-principles/2-OCP/typescript/example.ts
```
