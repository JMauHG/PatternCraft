import { InvoiceData } from './types';

// ❌ BAD: This class has MULTIPLE responsibilities
class Invoice {
  private invoices: InvoiceData[] = [];

  // Responsibility 1: Invoice management
  addInvoice(id: string, amount: number, client: string): void {
    this.invoices.push({ id, amount, client });
    console.log(`[Invoice] Added invoice ${id} for ${client}: $${amount}`);
  }

  deleteInvoice(id: string): void {
    const index = this.invoices.findIndex((inv) => inv.id === id);
    if (index !== -1) {
      this.invoices.splice(index, 1);
      console.log(`[Invoice] Deleted invoice ${id}`);
    }
  }

  // Responsibility 2: Report generation (DIFFERENT concern!)
  generateReport(): string {
    console.log('\n[Invoice] Generating report...');
    let report = '=== INVOICE REPORT ===\n';
    let total = 0;
    for (const inv of this.invoices) {
      report += `${inv.id}: ${inv.client} - $${inv.amount}\n`;
      total += inv.amount;
    }
    report += `======================\nTotal: $${total}`;

    console.log(`[Invoice] Report content:\n${report}`);
    return report;
  }

  // Responsibility 3: Email communication (ANOTHER concern!)
  emailReport(to: string, report: string): void {
    // sendingReportTo(to, report);
    console.log('\n[Invoice] Email sent!');
  }
}

// ============ DEMO ============

function main() {
  console.log('=== SRP Anti-Example: Invoice with Multiple Responsibilities ===\n');

  const invoice = new Invoice();

  invoice.addInvoice('INV-001', 1500, 'Acme Corp');
  invoice.addInvoice('INV-002', 2300, 'Tech Inc');
  invoice.addInvoice('INV-003', 800, 'StartUp LLC');

  const report = invoice.generateReport();

  invoice.emailReport('accounting@company.com', report);

  console.log('\n⚠️  Problems with this approach:');
  console.log('  - If report format changes, Invoice class changes');
  console.log('  - If email provider changes, Invoice class changes');
  console.log('  - Hard to test invoice logic without email/report dependencies');
  console.log('  - Class has THREE different reasons to change');
}

main();

export {};
