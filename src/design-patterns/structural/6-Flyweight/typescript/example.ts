// ✅ GOOD: Flyweight Pattern - Share glyph data across character instances

// Flyweight: holds only shared, immutable state (intrinsic)
class Glyph {
  private character: string;
  private fontFamily: string;
  private outline: string;

  constructor(character: string, fontFamily: string, outline: string) {
    this.character = character;
    this.fontFamily = fontFamily;
    this.outline = outline;
  }

  // Extrinsic state (row, col, fontSize, bold) is passed in — not stored in the flyweight
  public render(row: number, col: number, fontSize: number, bold: boolean): string {
    const style = bold ? 'bold' : 'normal';
    return `'${this.character}' [${this.fontFamily}, ${this.outline}] at (${row}, ${col}) size=${fontSize} ${style}`;
  }
}

// Flyweight factory: manages the pool of shared Glyph instances
class GlyphFactory {
  private static cache: Map<string, Glyph> = new Map();

  public static getGlyph(character: string, fontFamily: string, outline: string): Glyph {
    const key = `${character}-${fontFamily}`;

    if (!this.cache.has(key)) {
      this.cache.set(key, new Glyph(character, fontFamily, outline));
    }

    return this.cache.get(key)!;
  }

  public static getGlyphCount(): number {
    return this.cache.size;
  }
}

// Context object: holds extrinsic state and references a flyweight
class RenderedCharacter {
  private row: number;
  private col: number;
  private fontSize: number;
  private bold: boolean;
  private glyph: Glyph;

  constructor(row: number, col: number, fontSize: number, bold: boolean, glyph: Glyph) {
    this.row = row;
    this.col = col;
    this.fontSize = fontSize;
    this.bold = bold;
    this.glyph = glyph;
  }

  public render(): string {
    return this.glyph.render(this.row, this.col, this.fontSize, this.bold);
  }
}

// Document manages all rendered characters
class Document {
  private characters: RenderedCharacter[] = [];

  public addCharacter(
    row: number,
    col: number,
    character: string,
    fontFamily: string,
    outline: string,
    fontSize: number,
    bold: boolean
  ): void {
    const glyph = GlyphFactory.getGlyph(character, fontFamily, outline);
    this.characters.push(new RenderedCharacter(row, col, fontSize, bold, glyph));
  }

  public render(): void {
    for (const char of this.characters) {
      console.log(`  ${char.render()}`);
    }
  }

  public getCharacterCount(): number {
    return this.characters.length;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Flyweight Pattern: Text Editor Rendering ===\n');

  const doc = new Document();

  // Render many characters — glyphs for the same letter+font are shared
  doc.addCharacter(1, 1, 'a', 'Arial', 'arial_a_outline', 12, false);
  doc.addCharacter(1, 2, 'b', 'Arial', 'arial_b_outline', 12, false);
  doc.addCharacter(1, 3, 'c', 'Arial', 'arial_c_outline', 12, false);
  doc.addCharacter(1, 4, 'a', 'Arial', 'arial_a_outline', 14, true);
  doc.addCharacter(2, 1, 'a', 'Arial', 'arial_a_outline', 12, false);
  doc.addCharacter(2, 2, 'b', 'Arial', 'arial_b_outline', 16, true);
  doc.addCharacter(2, 3, 'a', 'Arial', 'arial_a_outline', 12, false);
  doc.addCharacter(2, 4, 'c', 'Arial', 'arial_c_outline', 12, false);

  console.log('--- Rendered characters ---\n');
  doc.render();

  console.log('');
  console.log(`Total characters rendered: ${doc.getCharacterCount()}`);
  console.log(`Unique Glyph objects in memory: ${GlyphFactory.getGlyphCount()}`);

  console.log('\n Benefits of Flyweight Pattern:');
  console.log('  - 8 characters share only 3 Glyph objects (font outline, metrics stored once)');
  console.log('  - Each RenderedCharacter only stores its unique position, size, and style (extrinsic state)');
  console.log('  - Memory savings grow dramatically with longer documents');
  console.log('  - Factory ensures no duplicate glyphs are created');
}

main();

export {};
