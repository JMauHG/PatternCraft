// ✅ GOOD: Prototype Pattern - Clone existing objects instead of recreating

// ===== Prototype Interface =====
interface Clonable<T> {
  clone(): T;
}

// ===== Concrete Prototype: A Complex Loan Rule Set =====
class LoanRules implements Clonable<LoanRules> {
  constructor(
    public name: string,
    public interestRate: number,
    public taxRate: number,
    public penalties: string[],
    public conditions: Record<string, any>
  ) {}

  // Deep clone to avoid shared references
  clone(): LoanRules {
    return new LoanRules(
      this.name,
      this.interestRate,
      this.taxRate,
      [...this.penalties], // Clone array
      { ...this.conditions } // Clone object
    );
  }

  display(): void {
    console.log(`\n${this.name}:`);
    console.log(`  Interest Rate: ${this.interestRate}%`);
    console.log(`  Tax Rate: ${this.taxRate}%`);
    console.log(`  Penalties: ${this.penalties.join(', ')}`);
    console.log(`  Conditions:`, this.conditions);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Prototype Pattern: Financial Loan Rules ===\n');

  // Base loan configuration (expensive initialization)
  console.log('Creating base mortgage template (expensive operation)...');
  const baseMortgage = new LoanRules(
    'Standard Mortgage Loan',
    5.0,
    1.5,
    ['late_fee', 'early_payment_penalty'],
    {
      minIncome: 30000,
      maxDebtRatio: 0.35,
      creditScoreMin: 650,
    }
  );

  console.log('✓ Base mortgage template created');
  baseMortgage.display();

  // Clone for Customer A (avoid expensive re-initialization)
  console.log('\n--- Cloning for Customer A ---');
  const loanForCustomerA = baseMortgage.clone();
  loanForCustomerA.name = 'Customer A - Special Rate';
  loanForCustomerA.interestRate = 4.2;
  loanForCustomerA.conditions.creditScoreMin = 600;
  loanForCustomerA.display();

  // Clone for Region B (different tax rules)
  console.log('\n--- Cloning for Region B ---');
  const loanForRegionB = baseMortgage.clone();
  loanForRegionB.name = 'Region B - Higher Tax';
  loanForRegionB.taxRate = 2.1;
  loanForRegionB.display();

  // Verify independence (no shared references)
  console.log('\n--- Verifying Independence ---');
  console.log(
    `Base mortgage still has original values: ${baseMortgage.interestRate}%`
  );
  console.log(
    `Customer A loan modified: ${loanForCustomerA.interestRate}%`
  );

  console.log('\n Benefits of Prototype Pattern:');
  console.log('  - Avoid expensive re-initialization of complex rules');
  console.log('  - Clone and modify instead of building from scratch');
  console.log('  - No shared references (deep clone)');
  console.log('  - Easy to create variations of base templates');
  console.log('  - Used in financial systems for loan/policy templates');
}

main();

export {};
