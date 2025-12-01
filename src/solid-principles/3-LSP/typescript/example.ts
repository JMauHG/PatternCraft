// ✅ Interface for flying capability
interface CanFly {
  fly(): string;
}

// ✅ Interface for running capability
interface CanRun {
  run(): string;
}

// ✅ Sparrow can fly - implements CanFly
class Sparrow implements CanFly {
  fly(): string {
    return 'flying gracefully';
  }
}

// ✅ Penguin can run and swim but NOT fly
class Penguin implements CanRun {
  run(): string {
    return 'waddling adorably';
  }
}

// ✅ Functions expect specific capabilities, not generic "Bird"
function startAirShow(performer: CanFly): void {
  console.log(`Air show: The bird is ${performer.fly()}`);
}

function startRace(runner: CanRun): void {
  console.log(`Race: The animal is ${runner.run()}`);
}

// ============ DEMO ============

function main() {
  console.log('=== LSP Good Example: capabilities are separated into interfaces ===\n');

  const sparrow = new Sparrow();
  const penguin = new Penguin();

  startAirShow(sparrow);
  startRace(penguin);
  // startRace(sparrow);  // ✅ TypeScript ERROR: Sparrow doesn't implement CanRun

  console.log('\n✅ Benefits of this approach:');
  console.log('  - No runtime errors from unexpected behavior');
  console.log('  - TypeScript catches invalid substitutions at compile time');
  console.log('  - Each type can only be used where it makes sense');
  console.log('  - Liskov Substitution Principle is respected');
}

main();

export {};