# Strategy Pattern

## Definition

Strategy lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable at runtime. The client holds a reference to a strategy interface and delegates the work, without knowing which concrete algorithm is executing.

**Analogy:** Imagine you're planning a trip with a GPS app. You can pick "drive" to get the fastest road route, "walk" to use pedestrian paths and shortcuts, or "bike" to favor bike lanes. The app doesn't change — only the routing strategy plugged into it does.

**Real-world use:** A checkout flow that applies different pricing strategies to the same cart — Regular charges full price, Seasonal takes 20% off during a sale, and VIP gives members 15% off plus the cheapest item free once the cart crosses a threshold. The `Checkout` class never changes; only the pricing strategy plugged into it does, so new rules (student discount, Black Friday, clearance) can be added without touching the checkout logic.

## Why is it important?

- **Open/Closed Principle:** New algorithms can be added without touching the client
- **Eliminates conditionals:** Replaces long `switch`/`if` chains with polymorphism
- **Runtime flexibility:** Algorithms can be swapped while the program runs
- **Isolation of concerns:** Each algorithm lives in its own class and can be tested independently

## How to Implement Strategy

1. **Identify an algorithm** in the client class that varies and is selected at runtime
2. **Declare a strategy interface** that all variants will implement
3. **Extract each variant** of the algorithm into its own concrete strategy class
4. **Add a strategy field** in the context class and a setter to change it
5. **Delegate the work** from the context to the current strategy instead of running it directly
6. **Let the client choose** and inject the desired strategy

## When to Use

- You have many related classes that differ only in their behavior
- You need different variants of an algorithm and want to switch between them at runtime
- An algorithm uses data the client shouldn't know about (hide behind a strategy)
- A class has a massive conditional that selects between behaviors

## Signs of Misuse

- You only have one or two algorithms and they almost never change — a simple function is enough
- Strategies end up sharing so much state with the context that they become tightly coupled
- Creating strategy classes that are never swapped (pointless indirection)
- Using Strategy when the variation is compile-time only — a plain subclass would be clearer

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/8-Strategy/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/8-Strategy/typescript/example.ts
```
