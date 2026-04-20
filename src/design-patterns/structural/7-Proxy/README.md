# Proxy Pattern

## Definition

Proxy provides a substitute or placeholder for another object. It controls access to the original, letting you perform actions before or after the request reaches it — without the client knowing the difference.

**Analogy:** A credit card is a proxy for your bank account, which is itself a proxy for cash. All three let you pay for things. The credit card doesn't hold money, but it controls access to your bank account — adding convenience, security checks, and spending limits along the way.

**Real-world use:** A database query proxy that adds lazy initialization (only connects when the first query is made), caching (returns stored results for repeated queries), and logging (records every query for auditing) — all transparently, without modifying the actual database service.

## Why is it important?

- **Controlled access:** Adds a layer of control (security, caching, logging) without modifying the real service
- **Lazy initialization:** Delays creation of expensive objects until they're actually needed
- **Transparent to client:** Proxy and real service share the same interface — the client never knows the difference
- **Open/Closed Principle:** New proxy behaviors can be added without changing the service or client code

## How to Implement Proxy

1. **Define a service interface** that both the real service and proxy implement
2. **Create the real service** class with actual business logic
3. **Create the proxy class** that implements the same interface and holds a reference to the real service
4. **Add proxy logic** (lazy init, caching, access control, logging) before or after delegating to the real service
5. **The client uses the interface** — it can receive either the real service or the proxy

## When to Use

- **Lazy initialization (virtual proxy):** Defer creation of a heavyweight object until first use
- **Access control (protection proxy):** Restrict access based on credentials or permissions
- **Caching (caching proxy):** Store and return results of expensive operations
- **Logging (logging proxy):** Record requests for auditing without modifying the service
- **Remote proxy:** Represent a remote object as if it were local

## Signs of Misuse

- Adding a proxy when direct access to the service is perfectly fine
- Making the proxy do too much — it should delegate, not replace the service's logic
- Using a proxy when a simple decorator or middleware would suffice
- Creating proxies for lightweight objects where lazy initialization adds no value

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/structural/7-Proxy/typescript/anti-example.ts
npx ts-node src/design-patterns/structural/7-Proxy/typescript/example.ts
```
