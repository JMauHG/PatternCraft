# DIP - Dependency Inversion Principle

## Definition

It establishes that high-level classes should not depend on low-level classes, but on abstractions.

## Why is it important?

- **Decoupling:** High-level logic doesn't change when low-level implementations change
- **Testability:** Easy to inject mocks for testing
- **Flexibility:** Easy to swap implementations
- **Maintainability:** Changes are isolated to specific modules

## How to Achieve DIP

1. **Define interfaces/abstractions** for dependencies
2. **Inject dependencies** through constructors or setters
3. **Use dependency injection containers** for complex applications
4. **Program to interfaces**, not concrete implementations

## Signs of DIP Violation

- High-level classes instantiate low-level classes directly with `new`
- Changing a database or external service requires modifying business logic
- Unit tests require real implementations instead of mocks
- Imports of concrete classes in business logic modules

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/solid-principles/5-DIP/typescript/anti-example.ts
npx ts-node src/solid-principles/5-DIP/typescript/example.ts
```

