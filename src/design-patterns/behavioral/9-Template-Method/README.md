# Template Method Pattern

## Definition

Template Method defines the skeleton of an algorithm in a base class and lets subclasses override specific steps without changing the algorithm's overall structure. The base class locks the sequence; subclasses fill in the variable parts.

**Analogy:** Think of a recipe for a sandwich: take two slices of bread, add a filling, add a sauce, close it, and serve. The steps are fixed, but you can swap the filling and sauce — ham with mustard, cheese with mayo, turkey with pesto — without redesigning the sandwich-making process.

**Real-world use:** A data-mining pipeline that always runs the same five steps — open the file, extract the raw content, parse it into rows, analyze the result, and close the file. The opening, analysis, and closing are identical for every format, while only extraction and parsing change: `PdfDataMiner` pulls text from PDF pages and splits by pipes, `CsvDataMiner` reads bytes and splits by commas, and `DocDataMiner` extracts rich text and splits by tabs. Adding a new format (JSON, XML) is just one more subclass — the workflow skeleton never changes.

## Why is it important?

- **Eliminates duplication:** Common workflow lives once, in the base class
- **Enforces structure:** The algorithm's order cannot be accidentally changed by subclasses
- **Hollywood Principle:** "Don't call us, we'll call you" — the base class drives, subclasses react
- **Extensibility:** New variants just override the steps that differ

## How to Implement Template Method

1. **Analyze the algorithm** and identify which steps are invariant and which vary
2. **Create an abstract base class** with a `final`-style template method that calls the steps in order
3. **Declare the varying steps as abstract methods** (or virtual hooks with defaults)
4. **Implement the invariant steps** in the base class
5. **Create concrete subclasses** that override only the varying steps
6. **Optionally add hooks** — no-op methods subclasses may override to tweak behavior

## When to Use

- Several classes perform a very similar algorithm with only a few steps different
- You want to let clients extend specific steps but not the overall algorithm
- You see duplicated workflow code across sibling classes begging to be factored out
- A framework needs to define a lifecycle and let users plug into specific points

## Signs of Misuse

- The base class grows into a god object with dozens of hooks
- Subclasses need to override so many steps that composition (Strategy) would be cleaner
- The "template" is actually trivial (one or two lines) — inheritance adds no value
- Subclasses need to change the order of steps — that's a sign Template Method is the wrong fit

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/9-Template-Method/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/9-Template-Method/typescript/example.ts
```
