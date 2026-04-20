# Builder Pattern

## Definition

Builder helps construct complex objects step by step, without exposing internal construction logic.

**Analogy:** BuBurger joint: creating burgers step by step.

**Real-world use**: Stripe uses Builder to create PaymentIntents (see [Java SDK](https://docs.stripe.com/api/payment_intents/create?lang=java)).

## Why is it important?

- **Step-by-step construction:** Build complex objects incrementally
- **Fluent interface:** Chain method calls for readable code
- **Encapsulation:** Hide complex construction logic from the client
- **Flexibility:** Same construction process can create different representations

## Key Components

### Builder
The class that provides methods to set each part of the object and a `build()` method to return the final product.

### Director (Optional)
Knows which sequence of builder calls creates a given configuration. Useful for predefined "recipes".

## How to Implement Builder

1. **Create the product class** with all required properties
2. **Create a Builder class** with methods for each property that return `this`
3. **Add a `build()` method** that returns the constructed object
4. **Optionally create a Director** to encapsulate common configurations

## When to Use

- Objects with many optional parameters
- Objects that require multiple steps to construct
- When you need to create different representations of the same product
- When construction logic is complex and should be isolated

## Signs of Misuse

- Using Builder for simple objects with few parameters
- Builder that doesn't return `this` (breaks fluent interface)
- Creating too many Director methods instead of letting clients compose

## How to Run

From the project root:

```bash
# TypeScript
npx ts-node src/design-patterns/creational/2-Builder/typescript/anti-example.ts
npx ts-node src/design-patterns/creational/2-Builder/typescript/example.ts
```
