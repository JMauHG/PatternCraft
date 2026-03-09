// ✅ GOOD: Adapter Pattern - Makes incompatible interfaces work together

// Target interface that the client expects
interface RoundPeg {
  getRadius(): number;
}

class RoundHole {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }

  public fits(peg: RoundPeg): boolean {
    return peg.getRadius() <= this.radius;
  }
}

class ConcreteRoundPeg implements RoundPeg {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }
}

// Incompatible service — uses width instead of radius
class SquarePeg {
  private width: number;

  constructor(width: number) {
    this.width = width;
  }

  public getWidth(): number {
    return this.width;
  }
}

// Adapter: wraps SquarePeg and translates its interface to RoundPeg
class SquarePegAdapter implements RoundPeg {
  private squarePeg: SquarePeg;

  constructor(squarePeg: SquarePeg) {
    this.squarePeg = squarePeg;
  }

  public getRadius(): number {
    // Calculate the minimum circle radius that can fit the square peg
    return (this.squarePeg.getWidth() * Math.sqrt(2)) / 2;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Adapter Pattern: Square Pegs in Round Holes ===\n');

  const hole = new RoundHole(5);
  const roundPeg = new ConcreteRoundPeg(5);
  console.log(`Round hole radius: ${hole.getRadius()}`);
  console.log(`Round peg radius: ${roundPeg.getRadius()}`);
  console.log(`Does round peg fit? ${hole.fits(roundPeg)}`);

  console.log('');

  const smallSquarePeg = new SquarePeg(5);
  const largeSquarePeg = new SquarePeg(10);

  // Adapt square pegs to work with round holes
  const smallAdapter = new SquarePegAdapter(smallSquarePeg);
  const largeAdapter = new SquarePegAdapter(largeSquarePeg);

  console.log(`Small square peg width: ${smallSquarePeg.getWidth()}`);
  console.log(`Small adapter radius: ${smallAdapter.getRadius().toFixed(2)}`);
  console.log(`Does small square peg fit? ${hole.fits(smallAdapter)}`);

  console.log('');

  console.log(`Large square peg width: ${largeSquarePeg.getWidth()}`);
  console.log(`Large adapter radius: ${largeAdapter.getRadius().toFixed(2)}`);
  console.log(`Does large square peg fit? ${hole.fits(largeAdapter)}`);

  console.log('\n Benefits of Adapter Pattern:');
  console.log('  - RoundHole works with SquarePeg without modifying either class');
  console.log('  - Conversion logic is isolated in the adapter');
  console.log('  - New peg types can be adapted without changing existing code');
  console.log('  - Follows Single Responsibility and Open/Closed principles');
}

main();

export {};
