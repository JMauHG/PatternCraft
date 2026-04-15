// ❌ BAD: No Flyweight - Every character stores its own copy of glyph data

class RenderedCharacter {
  private row: number;
  private col: number;
  private character: string;
  private fontFamily: string;
  private outline: string;
  private fontSize: number;
  private bold: boolean;

  constructor(
    row: number,
    col: number,
    character: string,
    fontFamily: string,
    outline: string,
    fontSize: number,
    bold: boolean
  ) {
    this.row = row;
    this.col = col;
    this.character = character;
    this.fontFamily = fontFamily;
    this.outline = outline;
    this.fontSize = fontSize;
    this.bold = bold;
  }

  public render(): string {
    const style = this.bold ? 'bold' : 'normal';
    return `'${this.character}' [${this.fontFamily}, ${this.outline}] at (${this.row}, ${this.col}) size=${this.fontSize} ${style}`;
  }
}

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
    // Every character gets its own copy of font family and outline data
    this.characters.push(new RenderedCharacter(row, col, character, fontFamily, outline, fontSize, bold));
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
  console.log('=== Anti-Example: No Flyweight (Duplicated Glyph Data) ===\n');

  const doc = new Document();

  // Each character stores its own fontFamily and outline — all duplicated
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
  console.log(`Total characters created: ${doc.getCharacterCount()}`);
  console.log(`Objects storing glyph data: ${doc.getCharacterCount()} (one per character!)`);

  console.log('\n Problems with this approach:');
  console.log('  - 8 characters = 8 copies of font family and outline data');
  console.log('  - With a 100,000-character document, glyph data alone could consume massive memory');
  console.log('  - Identical glyph data is duplicated across every character object');
  console.log('  - No distinction between shared and unique state');
}

main();

export {};
