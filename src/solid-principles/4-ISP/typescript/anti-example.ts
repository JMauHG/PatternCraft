// ❌ BAD: "Fat" interface with too many responsibilities
interface MultiPurposePrinter {
  print(document: string): void;
  scan(): string;
  fax(document: string, number: string): void;
}

// ❌ BasicPrinter is FORCED to implement methods it doesn't support
class BasicPrinter implements MultiPurposePrinter {
  print(document: string): void {
    console.log(`[BasicPrinter] Printing: ${document}`);
  }

  scan(): string {
    // Forced to implement even though BasicPrinter can't scan!
    throw new Error('Scan not supported on BasicPrinter');
  }

  fax(document: string, number: string): void {
    // Forced to implement even though BasicPrinter can't fax!
    throw new Error('Fax not supported on BasicPrinter');
  }
}

// This class can actually do everything
class OfficeMegaMachine implements MultiPurposePrinter {
  print(document: string): void {
    console.log(`[OfficeMega] Printing: ${document}`);
  }

  scan(): string {
    console.log('[OfficeMega] Scanning document...');
    return 'scanned_document.pdf';
  }

  fax(document: string, number: string): void {
    console.log(`[OfficeMega] Faxing "${document}" to ${number}`);
  }
}

// ============ DEMO ============

function main() {
  console.log('=== ISP Anti-Example: Fat interface forces classes to implement unused methods ===\n');

  const basicPrinter = new BasicPrinter();
  const officeMega = new OfficeMegaMachine();

  basicPrinter.print('Hello World');

  try {
    basicPrinter.scan();
  } catch (e) {
    console.log(`❌ ${(e as Error).message}`);
  }

  officeMega.print('Report Q4');
  officeMega.scan();
  officeMega.fax('contract.pdf', '555-5678');

  console.log('\n⚠️  Problems with this approach:');
  console.log('  - BasicPrinter has methods that always throw errors');
  console.log('  - Clients cant trust that methods will work');
  console.log('  - Adding new methods to interface affects all implementations');
  console.log('  - Classes are coupled to functionality they dont need');
}

main();

export {};