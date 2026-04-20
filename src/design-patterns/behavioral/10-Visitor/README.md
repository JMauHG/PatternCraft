# Visitor Pattern

## Definition

Visitor lets you add new operations to an existing object structure without modifying the classes of the elements on which it operates. The operation is extracted into a separate visitor object, and each element accepts a visitor and dispatches back to the visitor's type-specific method (double dispatch).

**Analogy:** Imagine a tax auditor visiting a chain of shops. Each shop (bakery, pharmacy, bookstore) hands the auditor its books, and the auditor applies shop-specific rules. The shops themselves didn't learn how to do taxes — they just let the visitor in.

**Real-world use:** A linter that walks an AST — `VariableDeclaration`, `FunctionDeclaration`, `IfStatement`, `Block` — and runs many independent rules over it. Instead of bolting `checkNaming`, `checkEmptyBlocks`, `checkPreferConst` methods onto every node, each rule becomes its own visitor: `NamingConventionLinter` flags non-camelCase names, `EmptyBlockLinter` flags empty `if` bodies, `PreferConstLinter` flags `let` that could be `const`. Adding a new rule (`NoConsoleLog`, `MaxDepth`) is a new visitor class — the AST node classes never change.

## Why is it important?

- **Open/Closed Principle:** New operations can be added by writing a new visitor — element classes don't change
- **Single Responsibility:** Each visitor concentrates one concern (export, validation, pricing) in one place
- **Keeps data classes clean:** Element classes don't accumulate unrelated methods like `exportXml`, `exportJson`, `calcTax`
- **Accumulates related behavior:** Logic that used to be spread across many classes becomes one cohesive visitor

## How to Implement Visitor

1. **Declare a visitor interface** with a `visitXxx` method for every concrete element type
2. **Declare an element interface** with an `accept(visitor)` method
3. **Implement `accept` in every concrete element** so it calls `visitor.visitXxx(this)` — this is the double dispatch
4. **Create a concrete visitor** for each new operation you want to add
5. **Walk the structure** and call `element.accept(visitor)` on every node
6. **Collect results** from the visitor after the traversal finishes

## When to Use

- You need to perform many unrelated operations on a stable object hierarchy
- The operations don't naturally belong in the element classes (e.g., export, reporting, analytics)
- You want to keep your data classes focused on their domain responsibilities
- You're walking a tree or composite structure and want to cleanly separate the traversal from the action

## Signs of Misuse

- The element hierarchy changes often — every new element forces edits to every visitor
- Visitors need access to element internals that should stay encapsulated — they start exposing private state
- There's only one operation — a plain method on the element would be clearer
- You're using Visitor to simulate pattern matching in a language that already has it

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/10-Visitor/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/10-Visitor/typescript/example.ts
```
