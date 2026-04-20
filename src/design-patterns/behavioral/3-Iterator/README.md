# Iterator Pattern

## Definition

Iterator lets you traverse elements of a collection without exposing its underlying representation (list, tree, graph, etc.). Clients work through a uniform interface regardless of how the collection is actually stored.

**Analogy:** Think of visiting Rome for the first time. You could wander the streets on your own, trying to find each landmark, or you could use a guided tour that takes you from one attraction to the next in order. The tour (iterator) knows how to walk the city; you only need to follow along.

**Real-world use:** Traversing profiles on different social networks (Facebook, LinkedIn) with a single iteration contract, so client code doesn't have to learn each platform's API shape.

## Why is it important?

- **Encapsulation:** Hides the internal structure of a collection from the client
- **Single Responsibility:** Traversal logic is extracted from the collection itself
- **Uniform access:** Clients use the same interface to iterate over very different collections
- **Parallel traversal:** Multiple iterators can traverse the same collection independently

## How to Implement Iterator

1. **Declare an iterator interface** with methods like `hasNext()` and `next()`
2. **Create concrete iterators** for each collection type, each holding its own traversal state
3. **Declare a collection interface** with a method to create an iterator
4. **Implement the collection** so it returns an appropriate iterator for its data
5. **Use the iterator from the client** without knowing how the collection is organized

## When to Use

- Your collection has a complex data structure you want to hide from clients
- You want to provide several traversal strategies over the same data
- You need a uniform way to iterate over different kinds of collections
- Traversal state needs to be captured and resumed later

## Signs of Misuse

- Writing iterators for simple arrays that are already iterable natively
- Iterators that expose the underlying collection's internals anyway
- Stateful iterators shared between threads or clients without care
- Reinventing iteration when a built-in language feature (e.g., `Symbol.iterator`) already covers your case

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/3-Iterator/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/3-Iterator/typescript/example.ts
```
