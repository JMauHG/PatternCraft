# Command Pattern

## Definition

Command turns a request into a stand-alone object that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request's execution, and support undoable operations.

**Analogy:** After a long walk through the city, you finally arrive at a nice restaurant. The waiter hands you the menu, you choose your meal, and the waiter writes it down on a piece of paper. The order (a command) travels to the kitchen where the cook executes it. The same order could be queued, repeated, or cancelled — without the customer ever talking directly to the cook.

**Real-world use:** Text editors that support undo/redo by encapsulating each user action (copy, paste, type) as a command object stored on a history stack.

## Why is it important?

- **Decoupling:** Separates the object that invokes an operation from the one that actually performs it
- **Undo/redo support:** Commands can store their inverse, making reversible actions trivial
- **Queuing and logging:** Requests can be stored, serialized, and replayed later
- **Extensibility:** New commands can be added without changing existing invokers

## How to Implement Command

1. **Declare a command interface** with a single execution method (and optionally `undo`)
2. **Create concrete command classes** that wrap a receiver and encapsulate a request
3. **Store any data needed to perform the action** (and undo it) inside the command
4. **Create invokers** that trigger commands without knowing their concrete types
5. **Wire up clients** to configure invokers with the appropriate commands

## When to Use

- You want to parameterize objects with operations (e.g., menu items, buttons)
- You need to queue, schedule, or execute operations remotely
- You need undo/redo functionality
- You want to implement callbacks, macros, or transactional behavior

## Signs of Misuse

- Creating commands for operations that will never be queued, undone, or logged
- Commands that grow into god-objects containing business logic that belongs in the receiver
- Many tiny commands where a simple function callback would do
- Commands that tightly couple to the invoker, defeating the purpose of the pattern

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/2-Command/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/2-Command/typescript/example.ts
```
