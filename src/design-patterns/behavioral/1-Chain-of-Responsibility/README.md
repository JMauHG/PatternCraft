# Chain of Responsibility Pattern

## Definition

Chain of Responsibility lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

**Analogy:** Imagine calling technical support. The first-line operator tries to help, but if the issue is complex, they forward the call to a specialist. If that specialist can't solve it either, the call goes up to a senior engineer. Each person in the chain either handles the problem or passes it on.

**Real-world use:** HTTP middleware pipelines (authentication → role check → throttling → logging) where each middleware decides to handle the request, reject it, or pass it to the next step.

## Why is it important?

- **Decoupling:** The sender of a request doesn't need to know which handler processes it
- **Single Responsibility:** Each handler focuses on one concern
- **Open/Closed Principle:** New handlers can be added without modifying existing ones
- **Flexible ordering:** Handlers can be reordered, added, or removed at runtime

## How to Implement Chain of Responsibility

1. **Define a handler interface** with a method to process the request and a method to set the next handler
2. **Create an abstract base handler** that stores the next handler and implements the default chaining logic
3. **Implement concrete handlers** — each one processes a specific case or delegates to the next
4. **Build the chain** by linking handlers together in the desired order
5. **Send the request** to the first handler in the chain

## When to Use

- Your program is expected to process different kinds of requests in various ways, but the exact types and sequences are unknown beforehand
- It's essential to execute several handlers in a particular order
- The set of handlers and their order are supposed to change at runtime
- You want to decouple the sender of a request from its receivers

## Signs of Misuse

- Chains where every handler always processes the request (use a simple pipeline instead)
- Very long chains that are hard to debug and trace
- Handlers that know too much about each other
- Using the pattern for a single conditional branch — a simple `if` would do

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/1-Chain-of-Responsibility/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/1-Chain-of-Responsibility/typescript/example.ts
```
