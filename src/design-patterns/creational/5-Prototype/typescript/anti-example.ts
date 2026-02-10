// ❌ BAD: No Prototype - Recreating complex objects from scratch

// ===== Complex Loan Rules Class =====
class LoanRules {
  constructor(
    public name: string,
    public interestRate: number,
    public taxRate: number,
    public penalties: string[],
    public conditions: Record<string, any>
  ) {}

  display(): void {
    console.log(`\n${this.name}:`);
    console.log(`  Interest Rate: ${this.interestRate}%`);
    console.log(`  Tax Rate: ${this.taxRate}%`);
    console.log(`  Penalties: ${this.penalties.join(', ')}`);
    console.log(`  Conditions:`, this.conditions);
  }
}

// ===== Helper to simulate expensive initialization =====
function createStandardMortgage(): LoanRules {
  // Imagine this involves:
  // - Database queries
  // - Complex calculations
  // - Validation
  // - External API calls
  console.log('⏳ Running expensive initialization...');
  console.log('   - Fetching base interest rates from API...');
  console.log('   - Calculating regional tax adjustments...');
  console.log('   - Loading penalty rules from database...');
  console.log('   - Validating compliance requirements...');

  return new LoanRules(
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
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Recreating Objects from Scratch ===\n');

  // Create loan for Customer A (expensive)
  console.log('Creating loan for Customer A...');
  const loanForCustomerA = createStandardMortgage();
  loanForCustomerA.name = 'Customer A - Special Rate';
  loanForCustomerA.interestRate = 4.2;
  loanForCustomerA.conditions.creditScoreMin = 600;
  loanForCustomerA.display();

  // Create loan for Region B (expensive again!)
  console.log('\nCreating loan for Region B...');
  const loanForRegionB = createStandardMortgage();
  loanForRegionB.name = 'Region B - Higher Tax';
  loanForRegionB.taxRate = 2.1;
  loanForRegionB.display();

  console.log('\n Problems with this approach:');
  console.log('  - Expensive initialization runs multiple times');
  console.log('  - Duplicate API calls, database queries, calculations');
  console.log('  - Wasted resources and time');
  console.log('  - Code duplication in initialization logic');
  console.log('  - Performance bottleneck in high-volume systems');
  console.log('  - Error-prone: each init might produce different results');
}

main();

export {};
