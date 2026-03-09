// ✅ GOOD: Flyweight Pattern - Share intrinsic state across many objects

// Flyweight: holds only shared, immutable state (intrinsic)
class TreeType {
  private name: string;
  private color: string;
  private texture: string;

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  // Extrinsic state (x, y) is passed in — not stored in the flyweight
  public draw(x: number, y: number): string {
    return `${this.name} [${this.color}, ${this.texture}] at (${x}, ${y})`;
  }
}

// Flyweight factory: manages the pool of shared TreeType instances
class TreeTypeFactory {
  private static cache: Map<string, TreeType> = new Map();

  public static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = `${name}-${color}-${texture}`;

    if (!this.cache.has(key)) {
      this.cache.set(key, new TreeType(name, color, texture));
    }

    return this.cache.get(key)!;
  }

  public static getTypeCount(): number {
    return this.cache.size;
  }
}

// Context object: holds extrinsic state and references a flyweight
class Tree {
  private x: number;
  private y: number;
  private type: TreeType;

  constructor(x: number, y: number, type: TreeType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  public draw(): string {
    return this.type.draw(this.x, this.y);
  }
}

// Forest manages all trees
class Forest {
  private trees: Tree[] = [];

  public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
    const type = TreeTypeFactory.getTreeType(name, color, texture);
    this.trees.push(new Tree(x, y, type));
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
  console.log('=== Flyweight Pattern: Forest Rendering ===\n');

  const forest = new Forest();

  // Plant many trees — only 3 TreeType flyweights will be created
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
  console.log(`Total trees planted: ${forest.getTreeCount()}`);
  console.log(`Unique TreeType objects in memory: ${TreeTypeFactory.getTypeCount()}`);

  console.log('\n Benefits of Flyweight Pattern:');
  console.log('  - 8 trees share only 3 TreeType objects (name, color, texture stored once)');
  console.log('  - Each Tree only stores its unique coordinates (extrinsic state)');
  console.log('  - Memory savings grow dramatically with more trees');
  console.log('  - Factory ensures no duplicate flyweights are created');
}

main();

export {};
