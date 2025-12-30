# SOLID Principles

SOLID is an acronym for five design principles that help create maintainable, scalable, and robust software.

## The Principles

#### SRP - Single Responsibility Principle
#### OCP - Open/Closed Principle
#### LSP - Liskov Substitution Principle
#### ISP - Interface Segregation Principle
#### DIP - Dependency Inversion Principle

## Mnemonic: The SOLID Company

Think of a well-organized company where:

| Principle | Mnemonic |
|-----------|----------|
| **S** | Each employee has a defined position in the company. |
| **O** | The company grows by hiring new employees, not by changing what current employees already do. |
| **L** | If an employee falls ill, another with the same profile can replace him or her without any problems. |
| **I** | You don't make one giant contract for all employees, you make one for each position. |
| **D** | The director doesn't depend on Juan the driver, he depends on the driver's contract. If Juan resigns, you hire Pedro and everything remains the same. |

## Prerequisites

Before diving into SOLID, understand **Dependency Injection**:
A class gets its dependencies from the outside instead of building them itself.
This makes the class easier to test, reuse, and maintain.

```
class UserService {
  constructor(database) {      // ✅ It receives dependency from the outside 
    this.db = database
  }

  saveUser(user) {
    this.db.insert(user)
  }
}

db = new Database()
service = new UserService(db)  // ← This is where dependency is injected.
```

## Quick Reference

```
src/solid-principles/
├── 1-SRP/
│   ├── README.md
│   └── typescript/
├── 2-OCP/
│   ├── README.md
│   └── typescript/
├── 3-LSP/
│   ├── README.md
│   └── typescript/
├── 4-ISP/
│   ├── README.md
│   └── typescript/
└── 5-DIP/
    ├── README.md
    └── typescript/
```