// ❌ BAD: No Adapter - Modifying existing classes to force compatibility

class RoundHole {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }

  // Forced to add special handling for every new peg type
  public fits(peg: RoundPeg | SquarePeg): boolean {
    if (peg instanceof SquarePeg) {
      // Conversion logic leaks into the hole class
      const squareRadius = (peg.getWidth() * Math.sqrt(2)) / 2;
      return squareRadius <= this.radius;
    }
    return (peg as RoundPeg).getRadius() <= this.radius;
  }
}

class RoundPeg {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }
}

class SquarePeg {
  private width: number;

  constructor(width: number) {
    this.width = width;
  }

  public getWidth(): number {
    return this.width;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Adapter (Modified Classes) ===\n');

  const hole = new RoundHole(5);
  const roundPeg = new RoundPeg(5);
  console.log(`Round hole radius: ${hole.getRadius()}`);
  console.log(`Round peg radius: ${roundPeg.getRadius()}`);
  console.log(`Does round peg fit? ${hole.fits(roundPeg)}`);

  console.log('');

  const smallSquarePeg = new SquarePeg(5);
  const largeSquarePeg = new SquarePeg(10);

  console.log(`Small square peg width: ${smallSquarePeg.getWidth()}`);
  console.log(`Does small square peg fit? ${hole.fits(smallSquarePeg)}`);

  console.log('');

  console.log(`Large square peg width: ${largeSquarePeg.getWidth()}`);
  console.log(`Does large square peg fit? ${hole.fits(largeSquarePeg)}`);

  console.log('\n Problems with this approach:');
  console.log('  - RoundHole must know about every peg type (violates Single Responsibility)');
  console.log('  - Adding a new peg type requires modifying RoundHole (violates Open/Closed)');
  console.log('  - Type checking with instanceof makes code fragile');
  console.log('  - Conversion logic is scattered instead of encapsulated');
}

main();

export {};
