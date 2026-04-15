# Adapter Pattern

## Definition

Adapter allows objects with incompatible interfaces to collaborate by wrapping one of them with a translation layer. Basically, it translates one interface to another.

**Mnemonics:** When you travel from the US to Europe for the first time, you may get a surprise when trying to charge your laptop. The power plug and sockets standards are different in different countries. That’s why your US plug won’t fit a German socket. The problem can be solved by using a power plug adapter that has the American-style socket and the European-style plug.

**Real-world use:** Normalize data between systems. When an external API doesn't have the format your app expects, you can create an adapter to make it work with the same flow.

## Why is it important?

- **Interface compatibility:** Allows classes with incompatible interfaces to work together
- **Single Responsibility:** Separates interface conversion logic from business logic
- **Open/Closed Principle:** New adapters can be introduced without modifying existing client code
- **Reusability:** Lets you reuse existing classes even if their interfaces don't match what you need

## How to Implement Adapter

1. **Identify the incompatible interfaces** — the client interface and the service you want to adapt
2. **Create an adapter class** that implements the client interface
3. **Store a reference to the service** inside the adapter (composition)
4. **Implement the client interface methods** by translating calls to the wrapped service
5. **Use the adapter** wherever the client expects the target interface

## When to Use

- You want to use an existing class but its interface is incompatible with your code
- You need to integrate a third-party library without changing your existing codebase
- You want to create a reusable class that cooperates with unrelated or unforeseen classes
- You need to wrap a legacy API with a modern interface

## Signs of Misuse

- Using an adapter when you could simply modify the original class
- Creating adapters for interfaces that are already compatible
- Stacking multiple adapters when a single refactoring would be simpler
- Over-engineering simple integrations that don't need a translation layer

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/structural/1-Adapter/typescript/anti-example.ts
npx ts-node src/design-patterns/structural/1-Adapter/typescript/example.ts
```
