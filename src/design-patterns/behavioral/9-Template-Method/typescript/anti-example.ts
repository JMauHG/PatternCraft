// ❌ BAD: No Template Method - Three classes with heavily duplicated workflow code

interface MiningReport {
  source: string;
  rowCount: number;
  summary: string;
}

class PdfDataMiner {
  public mine(path: string): MiningReport {
    // Duplicated: open
    console.log(`  [open] Opening "${path}"`);
    // Specific: extract
    console.log('  [extract] Extracting text stream from PDF pages');
    const raw = 'Name|Amount\nAlice|42\nBob|17';
    // Specific: parse
    console.log('  [parse] Parsing pipe-delimited PDF text');
    const rows = raw.split('\n').map((line) => line.split('|'));
    // Duplicated: analyze
    const summary = rows.length > 0 ? `first row has ${rows[0].length} fields` : 'no rows';
    console.log(`  [analyze] Analyzed ${rows.length} rows — ${summary}`);
    // Duplicated: close
    console.log('  [close] File closed');
    return { source: path, rowCount: rows.length, summary };
  }
}

class CsvDataMiner {
  public mine(path: string): MiningReport {
    // Duplicated: open
    console.log(`  [open] Opening "${path}"`);
    // Specific: extract
    console.log('  [extract] Reading CSV bytes from disk');
    const raw = 'name,amount\nAlice,42\nBob,17';
    // Specific: parse
    console.log('  [parse] Splitting CSV by commas');
    const rows = raw.split('\n').map((line) => line.split(','));
    // Duplicated: analyze
    const summary = rows.length > 0 ? `first row has ${rows[0].length} fields` : 'no rows';
    console.log(`  [analyze] Analyzed ${rows.length} rows — ${summary}`);
    // Duplicated: close
    console.log('  [close] File closed');
    return { source: path, rowCount: rows.length, summary };
  }
}

class DocDataMiner {
  public mine(path: string): MiningReport {
    // Duplicated: open
    console.log(`  [open] Opening "${path}"`);
    // Specific: extract
    console.log('  [extract] Extracting rich text from Doc structure');
    const raw = 'name\tamount\nAlice\t42\nBob\t17';
    // Specific: parse
    console.log('  [parse] Splitting Doc text by tabs');
    const rows = raw.split('\n').map((line) => line.split('\t'));
    // Duplicated: analyze — AND note the accidental drift: forgot to print the summary line
    const summary = rows.length > 0 ? `first row has ${rows[0].length} fields` : 'no rows';
    console.log(`  [analyze] Analyzed ${rows.length} rows`);
    // Duplicated: close
    console.log('  [close] File closed');
    return { source: path, rowCount: rows.length, summary };
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Data Mining With Duplicated Workflow ===\n');

  console.log('PDF pipeline:');
  const pdfReport = new PdfDataMiner().mine('report.pdf');
  console.log(`  -> rows: ${pdfReport.rowCount}, summary: ${pdfReport.summary}`);
  console.log('');

  console.log('CSV pipeline:');
  const csvReport = new CsvDataMiner().mine('report.csv');
  console.log(`  -> rows: ${csvReport.rowCount}, summary: ${csvReport.summary}`);
  console.log('');

  console.log('Doc pipeline:');
  const docReport = new DocDataMiner().mine('report.doc');
  console.log(`  -> rows: ${docReport.rowCount}, summary: ${docReport.summary}`);

  console.log('\n Problems with this approach:');
  console.log('  - Open / analyze / close code is copy-pasted across every miner');
  console.log('  - The classes have already started to drift (Doc forgot to log the summary)');
  console.log('  - Changing the workflow means editing every class in lockstep');
  console.log('  - Adding a new format means duplicating the whole pipeline again');
  console.log('  - Violates DRY and makes the order of steps impossible to enforce');
}

main();

export {};
