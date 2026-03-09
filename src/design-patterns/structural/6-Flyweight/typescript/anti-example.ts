// ❌ BAD: No Flyweight - Every tree stores its own copy of shared data

class Tree {
  private x: number;
  private y: number;
  private name: string;
  private color: string;
  private texture: string;

  constructor(x: number, y: number, name: string, color: string, texture: string) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  public draw(): string {
    return `${this.name} [${this.color}, ${this.texture}] at (${this.x}, ${this.y})`;
  }
}

class Forest {
  private trees: Tree[] = [];

  public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
    // Every tree gets its own copy of name, color, and texture
    this.trees.push(new Tree(x, y, name, color, texture));
  }

  public draw(): void {
    for (const tree of this.trees) {
      console.log(`  ${tree.draw()}`);
    }
  }

  public getTreeCount(): number {
    return this.trees.length;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Flyweight (Duplicated State) ===\n');

  const forest = new Forest();

  // Each tree stores its own "oak_texture.png", "green", "Oak" — all duplicated
  forest.plantTree(10, 20, 'Oak', 'green', 'oak_texture.png');
  forest.plantTree(50, 80, 'Oak', 'green', 'oak_texture.png');
  forest.plantTree(30, 60, 'Oak', 'green', 'oak_texture.png');
  forest.plantTree(70, 10, 'Pine', 'dark-green', 'pine_texture.png');
  forest.plantTree(90, 40, 'Pine', 'dark-green', 'pine_texture.png');
  forest.plantTree(15, 95, 'Birch', 'light-green', 'birch_texture.png');
  forest.plantTree(45, 70, 'Birch', 'light-green', 'birch_texture.png');
  forest.plantTree(60, 55, 'Oak', 'green', 'oak_texture.png');

  console.log('--- Rendered trees ---\n');
  forest.draw();

  console.log('');
  console.log(`Total trees created: ${forest.getTreeCount()}`);
  console.log(`Objects storing texture data: ${forest.getTreeCount()} (one per tree!)`);

  console.log('\n Problems with this approach:');
  console.log('  - 8 trees = 8 copies of name, color, and texture strings');
  console.log('  - With 1,000,000 trees, texture data alone could consume gigabytes');
  console.log('  - Identical data is duplicated across every object');
  console.log('  - No distinction between shared and unique state');
}

main();

export {};
