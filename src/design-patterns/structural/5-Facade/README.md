# Facade Pattern

## Definition

Facade provides a simplified interface to a complex subsystem — a library, framework, or set of interdependent classes. It doesn't hide the subsystem; it offers a convenient shortcut for the most common use cases.

**Mnemonics:** When you call a phone shop to place an order, the operator is a facade. You just say what you want and they handle everything behind the scenes — checking inventory, processing payment, and scheduling delivery. You never need to call each department yourself.

**Real-world use:** A video conversion library that internally manages codecs, audio mixers, bitrate analyzers, and file writers. Instead of forcing clients to initialize and orchestrate dozens of objects in the right order, a `VideoConverter` facade exposes a single `convert(file, format)` method.

## Why is it important?

- **Simplifies complex systems:** Provides a clean, minimal interface to intricate subsystems
- **Reduces coupling:** Client code depends on the facade, not on dozens of subsystem classes
- **Layered architecture:** Defines clear entry points for each subsystem layer
- **Doesn't restrict access:** Advanced users can still bypass the facade and use the subsystem directly

## How to Implement Facade

1. **Identify the subsystem** — the set of classes whose complexity you want to shield clients from
2. **Define a facade class** that provides simple methods covering the most common workflows
3. **Delegate calls** from the facade to the appropriate subsystem objects in the correct order
4. **Initialize subsystem objects** inside the facade so the client doesn't have to
5. **Keep the facade focused** — if it grows too large, extract parts into additional facades

## When to Use

- You need a simple interface to a complex subsystem
- You want to reduce dependencies between client code and third-party libraries
- You need to organize a subsystem into layers with clear entry points
- You want to shield clients from initialization and orchestration details

## Signs of Misuse

- The facade becomes a "god object" that does everything instead of delegating
- Using a facade when the subsystem is already simple enough
- Hiding the subsystem completely — facades should simplify, not lock out advanced usage
- Creating a facade that simply mirrors all subsystem methods without simplification

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/structural/5-Facade/typescript/anti-example.ts
npx ts-node src/design-patterns/structural/5-Facade/typescript/example.ts
```
