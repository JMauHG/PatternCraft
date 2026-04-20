// ✅ GOOD: Template Method Pattern - Shared data-mining skeleton, variable parsing steps

interface MiningReport {
  source: string;
  rowCount: number;
  summary: string;
}

// Abstract base class defines the skeleton of the mining algorithm
abstract class DataMiner {
  // The template method — locks the order of the steps
  public mine(path: string): MiningReport {
    this.openFile(path);
    const raw = this.extractData();
    const parsed = this.parseData(raw);
    const report = this.analyze(path, parsed);
    this.closeFile();
    return report;
  }

  // Invariant steps — same behavior for every subclass
  protected openFile(path: string): void {
    console.log(`  [open] Opening "${path}"`);
  }

  protected closeFile(): void {
    console.log('  [close] File closed');
  }

  protected analyze(path: string, rows: string[][]): MiningReport {
    const summary = rows.length > 0 ? `first row has ${rows[0].length} fields` : 'no rows';
    console.log(`  [analyze] Analyzed ${rows.length} rows — ${summary}`);
    return { source: path, rowCount: rows.length, summary };
  }

  // Variable steps — subclasses must fill these in
  protected abstract extractData(): string;
  protected abstract parseData(raw: string): string[][];
}

class PdfDataMiner extends DataMiner {
  protected extractData(): string {
    console.log('  [extract] Extracting text stream from PDF pages');
    return 'Name|Amount\nAlice|42\nBob|17';
  }

  protected parseData(raw: string): string[][] {
    console.log('  [parse] Parsing pipe-delimited PDF text');
    return raw.split('\n').map((line) => line.split('|'));
  }
}

class CsvDataMiner extends DataMiner {
  protected extractData(): string {
    console.log('  [extract] Reading CSV bytes from disk');
    return 'name,amount\nAlice,42\nBob,17';
  }

  protected parseData(raw: string): string[][] {
    console.log('  [parse] Splitting CSV by commas');
    return raw.split('\n').map((line) => line.split(','));
  }
}

class DocDataMiner extends DataMiner {
  protected extractData(): string {
    console.log('  [extract] Extracting rich text from Doc structure');
    return 'name\tamount\nAlice\t42\nBob\t17';
  }

  protected parseData(raw: string): string[][] {
    console.log('  [parse] Splitting Doc text by tabs');
    return raw.split('\n').map((line) => line.split('\t'));
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Template Method Pattern: Data Mining ===\n');

  const miners: { label: string; miner: DataMiner; path: string }[] = [
    { label: 'PDF', miner: new PdfDataMiner(), path: 'report.pdf' },
    { label: 'CSV', miner: new CsvDataMiner(), path: 'report.csv' },
    { label: 'Doc', miner: new DocDataMiner(), path: 'report.doc' },
  ];

  for (const { label, miner, path } of miners) {
    console.log(`${label} pipeline:`);
    const report = miner.mine(path);
    console.log(`  -> rows: ${report.rowCount}, summary: ${report.summary}`);
    console.log('');
  }

  console.log(' Benefits of Template Method Pattern:');
  console.log('  - The algorithm skeleton lives in one place — no duplicated workflow code');
  console.log('  - Subclasses only override the steps that actually differ');
  console.log('  - The order of steps cannot be accidentally broken by a subclass');
  console.log('  - Adding a new format (e.g., JSON) requires only one new subclass');
  console.log('  - Follows DRY and the Hollywood Principle');
}

main();

export {};
