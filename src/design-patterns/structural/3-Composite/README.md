# Composite Pattern

## Definition

Composite lets you compose objects into tree structures and then work with these structures as if they were individual objects. It allows treating single objects and groups of objects uniformly through a shared interface.

**Mnemonics:** Think of a military hierarchy. An army consists of divisions, divisions contain brigades, brigades have platoons, and platoons are made up of individual soldiers. When a general gives an order, it cascades down the tree — each level either executes it directly (soldiers) or delegates it to its children (divisions, brigades, platoons). The general doesn't care whether they're addressing one soldier or an entire division.

**Real-world use:** An e-commerce order system where a package can contain individual products or smaller boxes, each of which can contain more products or boxes. To calculate the total price, you call `getPrice()` on the root — leaves return their own price, and boxes recursively sum the prices of their children.

## Why is it important?

- **Uniform treatment:** Client code works with all elements through the same interface, regardless of complexity
- **Open/Closed Principle:** New element types (leaves or containers) can be added without modifying existing code
- **Simplifies recursion:** Complex tree traversals become simple polymorphic calls
- **Flexible composition:** Trees can be built and restructured dynamically at runtime

## How to Implement Composite

1. **Identify the tree structure** in your domain — what are the leaves and what are the containers?
2. **Declare a component interface** with methods that make sense for both simple and complex elements
3. **Create leaf classes** that implement the component interface with actual behavior
4. **Create container classes** that implement the component interface by delegating to children
5. **Add child management methods** (`add`, `remove`) to the container class
6. **The container delegates work** to its children and aggregates results (e.g., summing prices)

## When to Use

- Your core model can be represented as a tree structure
- You want client code to treat simple and composite elements uniformly
- You need to run operations recursively over a tree of objects
- You want to avoid type-checking logic to distinguish leaves from containers

## Signs of Misuse

- Using Composite when the data is flat and doesn't have a natural tree hierarchy
- Forcing a common interface when leaf and container behaviors are fundamentally different
- Over-generalizing the component interface to accommodate incompatible element types
- Adding child management methods to leaves where they make no sense

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/structural/3-Composite/typescript/anti-example.ts
npx ts-node src/design-patterns/structural/3-Composite/typescript/example.ts
```
