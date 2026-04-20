# Mediator Pattern

## Definition

Mediator reduces chaotic dependencies between objects by restricting direct communications. Instead of talking to each other, components only talk through a mediator object, which encapsulates how they collaborate.

**Analogy:** Pilots of landing airplanes don't talk to each other directly over the radio — that would be chaos. Instead, they talk to the air-traffic controller in the tower, who tells each plane what to do. The controller (the mediator) coordinates everyone, so the pilots only need to know one contact.

**Real-world use:** A chat room where users send messages through a central server. Users don't hold references to each other; the server (mediator) decides who receives a message and how.

## Why is it important?

- **Reduced coupling:** Components depend only on the mediator, not on each other
- **Single Responsibility:** Interaction rules live in one place, the mediator
- **Reusability:** Components become easier to reuse in other contexts
- **Simplified maintenance:** Changing interaction logic touches one file instead of many

## How to Implement Mediator

1. **Identify a group of tightly coupled classes** that communicate directly with each other
2. **Declare a mediator interface** describing the notifications components can send
3. **Implement a concrete mediator** that coordinates all components and holds references to them
4. **Give each component a reference to the mediator** instead of to its peers
5. **Route all inter-component communication** through the mediator

## When to Use

- A set of objects communicate in well-defined but complex ways, creating spaghetti dependencies
- Reusing a component is hard because it depends on too many other components
- Behavior distributed between classes should be customizable without creating many subclasses
- You want to centralize complex interaction logic in one place

## Signs of Misuse

- The mediator grows into a god object that knows every detail of every component
- Components still know about each other despite the mediator
- Using a mediator for only two components — direct calls would be simpler
- Putting component-specific business logic inside the mediator

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/4-Mediator/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/4-Mediator/typescript/example.ts
```
