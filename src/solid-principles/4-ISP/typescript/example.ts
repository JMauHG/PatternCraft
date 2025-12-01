interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(): string;
}

interface Fax {
  fax(document: string, number: string): void;
}

// ✅ BasicPrinter only implements what it can actually do
class BasicPrinter implements Printer {
  print(document: string): void {
    console.log(`[BasicPrinter] Printing: ${document}`);
  }
}

// ✅ PhotoScanner only implements Scanner
class PhotoScanner implements Scanner {
  scan(): string {
    console.log('[PhotoScanner] Scanning high-resolution image...');
    return 'photo_scan.png';
  }
}

// ✅ SimpleFax only implements Fax
class SimpleFax implements Fax {
  fax(document: string, number: string): void {
    console.log(`[SimpleFax] Faxing "${document}" to ${number}`);
  }
}

// ✅ OfficeAllInOne implements multiple interfaces (composition)
class OfficeAllInOne implements Printer, Scanner, Fax {
  print(document: string): void {
    console.log(`[AllInOne] Printing: ${document}`);
  }

  scan(): string {
    console.log('[AllInOne] Scanning document...');
    return 'scanned_document.pdf';
  }

  fax(document: string, number: string): void {
    console.log(`[AllInOne] Faxing "${document}" to ${number}`);
  }
}

// ✅ Functions request only what they need
function printReport(printer: Printer): void {
  printer.print('Quarterly Report');
}

function archiveDocument(scanner: Scanner): void {
  const file = scanner.scan();
  console.log(`Archived as: ${file}`);
}

function sendDocument(fax: Fax): void {
  fax.fax('contract.pdf', '555-1234');
}

// ============ DEMO ============

function main() {
  console.log('=== ISP Good Example: each class implements only what it supports ===\n');

  const basicPrinter = new BasicPrinter();
  const photoScanner = new PhotoScanner();
  const simpleFax = new SimpleFax();
  const allInOne = new OfficeAllInOne();

  printReport(basicPrinter);
  archiveDocument(photoScanner);
  sendDocument(simpleFax);

  printReport(allInOne);
  archiveDocument(allInOne);
  sendDocument(allInOne);

  console.log('\n✅ Benefits of this approach:');
  console.log('  - No "Not Supported" exceptions');
  console.log('  - Each class implements only what it can do');
  console.log('  - Functions request only what they need');
  console.log('  - Adding new interfaces doesnt affect existing classes');
  console.log('  - Clear, focused contracts for each capability');
}

main();

export {};