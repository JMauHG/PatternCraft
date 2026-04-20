# State Pattern

## Definition

State lets an object alter its behavior when its internal state changes — it appears as if the object has changed its class. Instead of using large conditional blocks to decide what to do based on a state variable, you extract each state into its own class that implements a common interface. The context object delegates behavior to the current state object and swaps it when transitioning.

**Analogy:** Think of a traffic light. At Red it tells cars to stop; at Green it tells them to go; at Yellow it warns them to slow down. The same physical light has entirely different behavior in each state, and transitions happen on a fixed schedule.

**Real-world use:** An audio player whose buttons (play, pause, stop) behave differently depending on whether it is currently Stopped, Playing, or Paused — pressing Play from Stopped starts the track, from Paused resumes it, and from Playing does nothing. Each state is its own class that knows how to react to each button and which state to transition to next.

## Why is it important?

- **Eliminates conditional spaghetti:** Replaces large switch/if-else blocks with polymorphism
- **Single Responsibility:** Each state class handles only its own behavior
- **Open/Closed Principle:** New states can be added without modifying existing states
- **Clearer transitions:** State changes are explicit and localized inside state classes
- **Easier testing:** States can be tested in isolation

## How to Implement State

1. **Identify the context** — the class whose behavior depends on its state
2. **Define a state interface** listing all the behaviors that can change with state
3. **Create a concrete state class** for each state implementing that interface
4. **Give the context a reference** to the current state object
5. **Delegate behavior** from the context to the current state
6. **Let states trigger transitions** by setting a new state on the context

## When to Use

- An object's behavior depends on its state and it must change behavior at runtime
- You have large conditional statements that branch on a state field
- You have duplicate state-dependent logic scattered across multiple methods
- The number of states is likely to grow

## Signs of Misuse

- Creating states for objects that only have two trivial modes (a boolean might be fine)
- State classes that share too much logic that should live in the context
- Letting the context drive transitions instead of the states themselves when states naturally know their next step
- Using State when a simple Strategy would suffice (State implies transitions; Strategy does not)

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/behavioral/7-State/typescript/anti-example.ts
npx ts-node src/design-patterns/behavioral/7-State/typescript/example.ts
```
