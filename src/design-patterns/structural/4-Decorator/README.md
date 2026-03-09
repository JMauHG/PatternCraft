# Decorator Pattern

## Definition

Decorator lets you attach new behaviors to objects by placing them inside wrapper objects that contain those behaviors. Decorators implement the same interface as the wrapped object, so they can be stacked in any combination at runtime.

**Mnemonics:** When you're cold, you wrap yourself in a sweater. Still cold? You put a jacket on top. Starting to rain? You add a raincoat. Each layer adds new behavior (warmth, water resistance) without modifying you or the other layers. You can add or remove layers independently.

**Real-world use:** A notification system where a base notifier sends emails, but you can dynamically wrap it with SMS, Slack, or push notification decorators. Instead of creating subclasses for every combination (`EmailAndSMS`, `EmailAndSlack`, `EmailSMSAndSlack`...), you stack only the decorators you need.

## Why is it important?

- **Runtime flexibility:** Add or remove behaviors dynamically without modifying the original object
- **Avoids class explosion:** No need for a subclass per combination of features
- **Single Responsibility:** Each decorator handles one specific concern
- **Open/Closed Principle:** New behaviors can be introduced as new decorators without touching existing code

## How to Implement Decorator

1. **Identify the component interface** — the common contract between the base object and its wrappers
2. **Create a concrete component** that provides the default behavior
3. **Create a base decorator class** that implements the component interface and holds a reference to a wrapped component
4. **Create concrete decorators** that extend the base decorator and add behavior before or after delegating to the wrapped object
5. **Compose decorators** by wrapping the component with one or more decorator layers

## When to Use

- You need to add responsibilities to objects dynamically at runtime
- Extending behavior via inheritance would lead to a combinatorial explosion of subclasses
- You want to combine several independent behaviors in any order
- The class you want to extend is final or otherwise cannot be subclassed

## Signs of Misuse

- Using decorators when a single subclass would be simpler and sufficient
- Creating decorators that depend on a specific stacking order (fragile design)
- Wrapping objects so many times that debugging becomes difficult
- Using Decorator when Strategy or simple composition would be cleaner

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/structural/4-Decorator/typescript/anti-example.ts
npx ts-node src/design-patterns/structural/4-Decorator/typescript/example.ts
```
