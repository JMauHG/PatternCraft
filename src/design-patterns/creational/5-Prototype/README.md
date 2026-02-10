# Prototype Pattern

## Definition

Prototype allows us to copy existing objects without the code depending on their classes. It creates new objects by cloning existing instances rather than creating them from scratch.

**Mnemonics:** Mitotic division of a cell (biology, remember?). After mitotic division, a pair of identical cells is formed. The original cell acts as a prototype and takes an active role in creating the copy.

**Real-world use:** Financial systems (banks and insurance) often manage very complex rule sets for loans and policies. These rules include dozens of interest calculations, risk factors, regional constraints, tax rules, penalties, and eligibility checks. Initializing these objects from scratch is expensive and error-prone. Instead, they maintain a base template (e.g., "standard mortgage loan") and clone it to apply small variations.

## Why is it important?

- **Avoid expensive initialization:** Clone complex objects instead of recreating from scratch
- **Reduce subclassing:** Create variants by cloning and modifying, not inheritance
- **Runtime flexibility:** Add/remove prototypes at runtime
- **Preserve state:** New objects inherit the state of the prototype

## Key Components

### Prototype Interface
Declares the cloning method (usually `clone()`).

### Concrete Prototype
Implements the cloning operation, creating a copy of itself.

### Client
Creates new objects by asking a prototype to clone itself.

## How to Implement Prototype

1. **Create a Prototype interface** with a `clone()` method
2. **Implement the `clone()` method** in concrete classes
3. **Perform deep cloning** for nested objects/arrays to avoid shared references
4. **Optionally create a prototype registry** to store and retrieve prototypes by key
5. **Clone and modify** instead of creating from scratch

## When to Use

- Object initialization is expensive (database queries, complex calculations)
- Objects have many possible configurations (avoiding constructor explosion)
- Need to avoid tight coupling to concrete classes
- Creating objects at runtime based on dynamic conditions
- Financial rule systems, Game object spawning, Document templates

## Signs of Misuse

- Using Prototype for simple objects where `new` is sufficient
- Shallow copying when deep copying is needed (shared mutable references)
- Prototype when the object structure changes frequently
- Not considering performance - cloning can be expensive for huge objects

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/creational/5-Prototype/typescript/anti-example.ts
npx ts-node src/design-patterns/creational/5-Prototype/typescript/example.ts
```
