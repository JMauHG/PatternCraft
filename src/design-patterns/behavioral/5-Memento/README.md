# Memento Pattern

## Definition

Memento lets you save and restore the previous state of an object without exposing its internal structure. It captures an object's internal state into a separate object (the memento) that only the original object can fully read, enabling features like undo/redo without breaking encapsulation.

**Analogy:** Think of a video game save point. When you save, the game stores a snapshot of your progress — health, inventory, location — in a save file. You don't need to know what's inside the file; you just load it to restore exactly where you left off.

**Real-world use:** Implementing undo/redo in text editors, graphic design tools, or transactional systems where you need to roll back to a previous valid state after a failed operation.

## Why is it important?

- **Preserves encapsulation:** Internal state is captured without exposing private fields to the outside world
- **Simplifies undo/redo:** Enables history features without cluttering the originator's code
- **Single Responsibility:** The caretaker manages history while the originator focuses on its own logic
- **Safe rollback:** Lets you restore a known-good state after an invalid operation or error

## How to Implement Memento

1. **Identify the originator** — the class whose state must be saved and restored
2. **Create a memento class** that stores a snapshot of the originator's state
3. **Add a `save()` method** to the originator that returns a new memento
4. **Add a `restore(memento)` method** that rebuilds the originator's state from a memento
5. **Create a caretaker** that keeps a history of mementos and decides when to save or restore
6. **Keep the memento's internals hidden** from the caretaker — it only holds and passes them around

## When to Use

- You need to implement undo/redo functionality
- You want to snapshot an object's state to revert it later
- Direct access to the object's fields would violate encapsulation
- You need to support transactional operations with rollback

## Signs of Misuse

- Exposing memento internals so anyone can modify the snapshot
- Storing mementos of objects that never change — wasted memory
- Using mementos where a simple copy or clone would suffice
- Letting the caretaker inspect or mutate the memento's data directly

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/5-Memento/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/5-Memento/typescript/example.ts
```
