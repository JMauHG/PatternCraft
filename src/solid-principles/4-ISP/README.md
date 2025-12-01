# ISP - Interface Segregation Principle

## Definition

It states that we shouldn't force classes to depend on methods they don't use. It's better to have specific interfaces rather than a general one.

## Why is it important?

- **Decoupling:** Classes only depend on what they actually need
- **Flexibility:** Easy to implement only relevant methods
- **Maintainability:** Changes to unused methods don't affect implementers
- **Clarity:** Interfaces clearly express their purpose

## How to Achieve ISP

1. **Identify related methods** that are always used together
2. **Split large interfaces** into smaller, cohesive ones
3. **Use interface composition** - classes can implement multiple interfaces
4. **Design interfaces from the client's perspective**

## Signs of ISP Violation

- Classes implementing interfaces with methods they don't need
- Methods that throw "Not Supported" or "Not Implemented" exceptions
- Large interfaces with many unrelated methods
- Classes with many empty method implementations

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/solid-principles/4-ISP/typescript/anti-example.ts
npx ts-node src/solid-principles/4-ISP/typescript/example.ts
```
