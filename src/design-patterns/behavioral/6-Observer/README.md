# Observer Pattern

## Definition

Observer defines a one-to-many dependency between objects so that when one object (the subject or publisher) changes state, all its dependents (observers or subscribers) are notified and updated automatically. It decouples the publisher from its subscribers: the publisher only knows it has a list of subscribers that implement a common interface.

**Analogy:** Think of a magazine subscription. The publisher doesn't know who the individual subscribers are — it just sends out each new issue to everyone on the list. Readers can subscribe and unsubscribe at any time without the publisher changing how it prints the magazine.

**Real-world use:** A stock price alert system where one publisher broadcasts price updates to multiple subscribers such as email, SMS, and push notifications.

## Why is it important?

- **Loose coupling:** The publisher only depends on an observer interface, not concrete subscribers
- **Open/Closed Principle:** New subscriber types can be added without modifying the publisher
- **Dynamic relationships:** Subscribers can be added or removed at runtime
- **Broadcast communication:** One state change can trigger many reactions automatically

## How to Implement Observer

1. **Define an observer interface** with an `update()` method that all subscribers must implement
2. **Create the subject (publisher) class** that maintains a list of observers
3. **Add `subscribe()` and `unsubscribe()` methods** to manage the list
4. **Add a `notify()` method** that iterates through observers and calls `update()` on each
5. **Implement concrete observers** that define what to do when notified
6. **Trigger `notify()`** from the publisher whenever the relevant state changes

## When to Use

- A change in one object requires changing others and you don't know in advance how many or which ones
- You need an event or pub/sub mechanism across loosely coupled components
- Subscribers should be able to join or leave dynamically
- You want to broadcast updates without hard-coding dependencies

## Signs of Misuse

- Publisher knows concrete subscriber types instead of relying on the interface
- Subscribers being notified for events they don't care about (no filtering)
- Circular notifications where observers update the subject and retrigger events
- Forgetting to unsubscribe, leading to memory leaks and ghost updates

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/6-Observer/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/6-Observer/typescript/example.ts
```
