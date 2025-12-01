// Base class with a fly method
class Bird {
  fly(): string {
    return 'flying';
  }
}

// ❌ BAD: Ostrich extends Bird but CANNOT fly
class Penguin extends Bird {
  fly(): string {
    // This violates expectations! Any code expecting a Bird to fly will break
    throw new Error('I cannot fly');
  }
}

// Function that expects any Bird to be able to fly
function makeBirdFly(bird: Bird): void {
  console.log(`The bird is ${bird.fly()}`);
}

// ============ DEMO ============

function main() {
  console.log('=== LSP Anti-Example: Penguin extends Bird but cannot fly ===\n');

  const sparrow = new Bird();
  makeBirdFly(sparrow);

  const penguin = new Penguin();
  try {
    makeBirdFly(penguin); // 💥 BOOM!
  } catch (error) {
    console.log(`❌ ERROR: ${(error as Error).message}`);
  }

  console.log('\n⚠️  This is a LSP violation because:');
  console.log('  - Penguin IS-A Bird (inheritance)');
  console.log('  - But Penguin CANNOT behave like a Bird (cannot fly)');
  console.log('  - Code expecting Bird will break with Penguin');
}

main();

export {};