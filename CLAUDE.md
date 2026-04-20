# PatternCraft - Project Guidelines

## Project Overview

Educational project with practical examples of OOP concepts, SOLID principles, and Design Patterns in TypeScript.

## Tech Stack

- TypeScript ^5.3.0, ts-node ^10.9.0
- Target: ES2020, Module: commonjs, Strict mode enabled
- Run examples: `npx ts-node <file-path>`

## Directory Structure

```
src/
├── design-patterns/
│   ├── README.md                          # Overview of all categories
│   ├── creational/
│   │   ├── README.md                      # Category overview with table
│   │   ├── 1-Singleton/
│   │   │   ├── README.md
│   │   │   └── typescript/
│   │   │       ├── example.ts
│   │   │       └── anti-example.ts
│   │   └── ...
│   ├── structural/
│   │   ├── README.md
│   │   └── 1-Adapter/ ...
│   └── behavioral/                        # (future)
└── solid-principles/
```

## Adding a New Design Pattern

### 1. Create the directory

Format: `src/design-patterns/<category>/[N]-[PatternName]/typescript/`

- `N` = next sequential number within the category
- `PatternName` in PascalCase (e.g., `3-Composite`, `4-Decorator`)

### 2. Create the pattern README.md

File: `src/design-patterns/<category>/[N]-[PatternName]/README.md`

Required sections in this exact order:

```markdown
# [Pattern Name] Pattern

## Definition
One-paragraph explanation of what the pattern does.

**Analogy:** A memorable real-world analogy.

**Real-world use:** A concrete software engineering scenario.

## Why is it important?
- **Benefit 1:** Explanation
- **Benefit 2:** Explanation
- **Benefit 3:** Explanation

## How to Implement [Pattern Name]
1. Step one
2. Step two
3. ...

## When to Use
- Use case 1
- Use case 2

## Signs of Misuse
- Anti-pattern 1
- Anti-pattern 2

## How to Run

From the project root:

\```bash
# TypeScript
npx ts-node src/design-patterns/<category>/[N]-[PatternName]/typescript/anti-example.ts
npx ts-node src/design-patterns/<category>/[N]-[PatternName]/typescript/example.ts
\```
```

### 3. Create example.ts (correct implementation)

File: `src/design-patterns/<category>/[N]-[PatternName]/typescript/example.ts`

```typescript
// ✅ GOOD: [Pattern Name] - [Brief description]

// ... interfaces, classes, implementation ...

// ============ DEMO ============

function main(): void {
  console.log('=== [Pattern Name]: [Context] ===\n');

  // Demo usage...

  console.log('\n Benefits of [Pattern Name]:');
  console.log('  - Benefit 1');
  console.log('  - Benefit 2');
}

main();

export {};
```

### 4. Create anti-example.ts (problematic approach)

File: `src/design-patterns/<category>/[N]-[PatternName]/typescript/anti-example.ts`

```typescript
// ❌ BAD: [Brief description of the problem]

// ... problematic implementation ...

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: [Description] ===\n');

  // Demo usage...

  console.log('\n Problems with this approach:');
  console.log('  - Problem 1');
  console.log('  - Problem 2');
}

main();

export {};
```

### 5. Update the category README

Add the new pattern to the table and quick reference tree in `src/design-patterns/<category>/README.md`.

## Code Style Conventions

- Explicit access modifiers (`public`, `private`) on all class members
- Interfaces for contracts, not abstract classes (unless the pattern specifically requires it)
- camelCase for methods/variables, PascalCase for classes/interfaces
- Comments to explain non-obvious logic (e.g., conversion formulas, design decisions)
- No underscore prefixes on private properties
- `console.log('')` for blank line separation in demo output
- Every file ends with `export {};`
