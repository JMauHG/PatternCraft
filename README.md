# PatternCraft

Practical examples of Object-Oriented Programming concepts, SOLID principles, and Design Patterns.

## Setup

```bash
npm install
```

# Recomendations
Install this vs code extensions:
- Markdown Preview Enhanced

## Contents

### SOLID Principles

| Principle | Description |
|-----------|-------------|
| **SRP** | Single Responsibility: one class, one job |
| **OCP** | Open/Closed: extend without modifying |
| **LSP** | Liskov Substitution: subtypes must be substitutable |
| **ISP** | Interface Segregation: small, focused interfaces |
| **DIP** | Dependency Inversion: depend on abstractions |

## Languages

Currently available in:
- TypeScript

## Project Structure

```
src/
  solid-principles/          # SOLID Principles
    1-SRP/
    2-OCP/
    3-LSP/
    4-ISP/
    5-DIP/
  design-patterns/           # (Coming soon)
    creational/
    structural/
    behavioral/
```

## How to Run Examples

Each topic has its own folder with:
- `README.md` - Explanation of the concept and how to run
- `typescript/` - TypeScript examples

Run any example from the project root:

```bash
npx ts-node <path-to-example>
```

## License

MIT
