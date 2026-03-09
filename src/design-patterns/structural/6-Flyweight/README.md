# Flyweight Pattern

## Definition

Flyweight lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of storing all the data in each one. It splits object state into **intrinsic** (shared, immutable) and **extrinsic** (unique, context-dependent) parts.

**Mnemonics:** Imagine rendering a forest with millions of trees. Each tree has a position (unique) but shares the same texture, color, and mesh data with other trees of the same species. Instead of duplicating megabytes of texture data per tree, all oaks share one `TreeType` object — only their coordinates differ.

**Real-world use:** A text editor rendering a document. Each character on screen has a unique position and style context, but the glyph data (font outline, metrics) for the letter "a" is shared across every occurrence. A flyweight pool stores one glyph per character, and each rendered character just references it with its position.

## Why is it important?

- **Memory efficiency:** Dramatically reduces RAM usage when dealing with thousands or millions of similar objects
- **Shared immutable state:** Intrinsic state is stored once and reused, avoiding redundant duplication
- **Scalability:** Allows applications to handle far more objects than would otherwise fit in memory
- **Clear state separation:** Forces you to distinguish between what's shared and what's unique

## How to Implement Flyweight

1. **Identify the shared state** (intrinsic) — data that doesn't change and is duplicated across many objects
2. **Identify the unique state** (extrinsic) — context-specific data that varies per object
3. **Create a flyweight class** that holds only intrinsic state and is immutable
4. **Create a flyweight factory** that manages a pool of flyweight instances, returning existing ones when possible
5. **Store extrinsic state externally** — the client or a context object passes it to the flyweight's methods

## When to Use

- Your application creates a huge number of similar objects that drain memory
- Objects contain duplicate state that can be extracted and shared
- Many groups of objects can be replaced with fewer shared objects plus extrinsic data
- The application doesn't depend on object identity (shared objects are interchangeable)

## Signs of Misuse

- Using Flyweight when the number of objects is small and memory isn't a concern
- Making flyweight objects mutable (intrinsic state must be immutable)
- Over-complicating code when a simpler data structure would suffice
- Applying the pattern when the "shared" state is actually unique per object

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/structural/6-Flyweight/typescript/anti-example.ts
npx ts-node src/design-patterns/structural/6-Flyweight/typescript/example.ts
```
