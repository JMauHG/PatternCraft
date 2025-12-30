import { InvoiceData } from './types';

// ✅ GOOD: Invoice class - ONLY manages invoice data
class Invoice {
  private invoices: InvoiceData[] = [];

  add(id: string, amount: number, client: string): void {
    this.invoices.push({ id, amount, client });
    console.log(`[Invoice] Added invoice ${id} for ${client}: $${amount}`);
  }

  delete(id: string): void {
    const index = this.invoices.findIndex((inv) => inv.id === id);
    if (index !== -1) {
      this.invoices.splice(index, 1);
      console.log(`[Invoice] Deleted invoice ${id}`);
    }
  }

  getAll(): InvoiceData[] {
    return [...this.invoices];
  }
}

// ✅ GOOD: Report class - ONLY generates reports
class Report {
  generate(invoices: InvoiceData[]): string {
    console.log('\n[Report] Generating report...');
    let report = '=== INVOICE REPORT ===\n';
    for (const inv of invoices) {
      report += `${inv.id}: ${inv.client} - $${inv.amount}\n`;
    }

    console.log(`[Report] Content:\n${report}`);
    return report;
  }
}

// ✅ GOOD: Email class - ONLY handles email sending
class Email {
  send(to: string, subject: string, body: string): void {
    console.log('\n[Email] Sending email!');
    console.log(`[Email] Sending to: ${to}`);
    console.log(`[Email] Subject: ${subject}`);
  }
}

// ============ DEMO ============

function main() {
  console.log('=== SRP Good Example: Separated Responsibilities ===\n');

  // Each class has ONE responsibility
  const invoice = new Invoice();
  const report = new Report();
  const email = new Email();

  // Invoice management (Invoice class responsibility)
  invoice.add('INV-001', 1500, 'Acme Corp');
  invoice.add('INV-002', 2300, 'Tech Inc');
  invoice.add('INV-003', 800, 'StartUp LLC');

  // Report generation (Report class responsibility)
  const reportContent = report.generate(invoice.getAll());

  // Email sending (Email class responsibility)
  email.send('accounting@company.com', 'Monthly Invoice Report', reportContent);

  console.log('\n✅ Benefits of this approach:');
  console.log('  - Invoice class only changes for invoice logic');
  console.log('  - Report class only changes for report format');
  console.log('  - Email class only changes for email logic');
  console.log('  - Each class has ONE reason to change');
  console.log('  - Easy to test each class in isolation');
  console.log('  - Easy to reuse Report or Email with other data');
}

main();

export {};