# Abstract Factory Pattern

## Definition

Abstract Factory allows us to produce families of related objects without specifying their concrete classes. It provides an interface for creating families of related or dependent objects without specifying their concrete classes.

**Analogy:** Furniture Factory - you pick a factory (Modern, Victorian), and it produces a whole set of matching furniture.

**Real-world use:** UI Themes - when you need to create a consistent set of UI components (buttons, cards, inputs) that match a specific theme (Dark, Light, High Contrast).

## Why is it important?

- **Family of products:** Creates groups of related objects that work together
- **Consistency:** Ensures all products from a factory are compatible
- **Isolation:** Client code is decoupled from concrete product classes
- **Single point of change:** Switching product families only requires changing the factory

## Key Components

### Abstract Product
Interfaces for each type of product in the family (e.g., Button, Card).

### Concrete Product
Specific implementations of products (e.g., DarkButton, LightButton).

### Abstract Factory
Interface declaring methods for creating each abstract product.

### Concrete Factory
Implements the abstract factory to create products of a specific family (e.g., DarkThemeFactory creates all dark-themed components).

### Client
Uses only interfaces declared by Abstract Factory and Abstract Products.

## How to Implement Abstract Factory

1. **Define product interfaces** for each distinct product type in the family
2. **Create concrete product classes** for all variants (e.g., Dark and Light versions)
3. **Declare an abstract factory interface** with creation methods for all products
4. **Implement concrete factories** for each product family variant
5. **Client uses abstract factory interface** without knowing concrete classes

## When to Use

- System needs to work with multiple families of related products
- You want to ensure products from same family are used together
- UI theming systems (Dark/Light mode)
- Cross-platform applications (Windows/Mac/Linux components)
- Database drivers (MySQL/PostgreSQL specific connection/command/reader)

## Signs of Misuse

- Only one product family exists (use Factory Method instead)
- Products are not related or don't need to be consistent
- Adding new product types requires changing all factory classes
- Overusing when simple Factory Method would suffice

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/creational/4-AbstractFactory/typescript/anti-example.ts
npx ts-node src/design-patterns/creational/4-AbstractFactory/typescript/example.ts
```
