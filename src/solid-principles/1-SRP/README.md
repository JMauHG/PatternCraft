# SRP - Single Responsibility Principle

## Definition

It establishes that a class must have a single responsibility.

## Why is it important?

- **Easier to understand:** A class with one responsibility is simpler to comprehend
- **Easier to test:** Fewer dependencies and simpler behavior to verify
- **Easier to maintain:** Changes to one responsibility don't affect others
- **Less coupling:** Reduces dependencies between unrelated functionalities

## How to Achieve SRP

1. **Identify distinct responsibilities** in your class
2. **Extract each responsibility** into its own class
3. **Use composition** to combine behaviors when needed
4. **Apply the "one reason to change" rule** - if a class has multiple reasons to change, it has multiple responsibilities

## Signs of SRP Violation

- A class has methods that serve different purposes (e.g., data processing AND email sending)
- Changes to one feature require modifying unrelated methods
- The class name includes "And" or "Manager" suggesting multiple responsibilities
- Unit tests require mocking many unrelated dependencies

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/solid-principles/1-SRP/typescript/anti-example.ts
npx ts-node src/solid-principles/1-SRP/typescript/example.ts
```
