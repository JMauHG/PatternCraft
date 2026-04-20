// ❌ BAD: No Visitor - every lint rule is bolted onto every AST node class

interface LintIssue {
  rule: string;
  message: string;
}

interface AstNode {
  // Every new rule forces adding another method here and in every class below:
  checkNaming(): LintIssue[];
  checkEmptyBlocks(): LintIssue[];
  checkPreferConst(): LintIssue[];
  // checkNoConsoleLog(): LintIssue[];
  // checkMaxDepth(): LintIssue[];
}

function isCamelCase(name: string): boolean {
  return /^[a-z][a-zA-Z0-9]*$/.test(name);
}

class VariableDeclaration implements AstNode {
  private name: string;
  private kind: 'let' | 'const';

  constructor(name: string, kind: 'let' | 'const') {
    this.name = name;
    this.kind = kind;
  }

  // Rule logic leaks into the data class — and duplicated helpers leak in too
  public checkNaming(): LintIssue[] {
    return isCamelCase(this.name)
      ? []
      : [{ rule: 'naming', message: `variable "${this.name}" should be camelCase` }];
  }

  public checkEmptyBlocks(): LintIssue[] {
    return [];
  }

  public checkPreferConst(): LintIssue[] {
    return this.kind === 'let'
      ? [{ rule: 'prefer-const', message: `"${this.name}" is declared with let — prefer const` }]
      : [];
  }
}

class FunctionDeclaration implements AstNode {
  private name: string;
  private body: Block;

  constructor(name: string, body: Block) {
    this.name = name;
    this.body = body;
  }

  public checkNaming(): LintIssue[] {
    const own = isCamelCase(this.name)
      ? []
      : [{ rule: 'naming', message: `function "${this.name}" should be camelCase` }];
    return [...own, ...this.body.checkNaming()];
  }

  public checkEmptyBlocks(): LintIssue[] {
    return this.body.checkEmptyBlocks();
  }

  public checkPreferConst(): LintIssue[] {
    return this.body.checkPreferConst();
  }
}

class IfStatement implements AstNode {
  private condition: string;
  private body: Block;

  constructor(condition: string, body: Block) {
    this.condition = condition;
    this.body = body;
  }

  public checkNaming(): LintIssue[] {
    return this.body.checkNaming();
  }

  public checkEmptyBlocks(): LintIssue[] {
    const own =
      this.body.getStatements().length === 0
        ? [{ rule: 'empty-block', message: `if (${this.condition}) has an empty body` }]
        : [];
    return [...own, ...this.body.checkEmptyBlocks()];
  }

  public checkPreferConst(): LintIssue[] {
    return this.body.checkPreferConst();
  }
}

class Block implements AstNode {
  private statements: AstNode[];

  constructor(statements: AstNode[] = []) {
    this.statements = statements;
  }

  public getStatements(): AstNode[] {
    return this.statements;
  }

  public checkNaming(): LintIssue[] {
    return this.statements.flatMap((stmt) => stmt.checkNaming());
  }

  public checkEmptyBlocks(): LintIssue[] {
    return this.statements.flatMap((stmt) => stmt.checkEmptyBlocks());
  }

  public checkPreferConst(): LintIssue[] {
    return this.statements.flatMap((stmt) => stmt.checkPreferConst());
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Lint Rules Baked Into Every AST Node ===\n');

  const emptyIfBody = new Block([]);
  const ifStmt = new IfStatement('count > 0', emptyIfBody);
  const countDecl = new VariableDeclaration('count', 'let');
  const functionBody = new Block([countDecl, ifStmt]);
  const badFunction = new FunctionDeclaration('My_Func', functionBody);

  const program = new Block([badFunction]);

  const runs: { name: string; issues: LintIssue[] }[] = [
    { name: 'checkNaming', issues: program.checkNaming() },
    { name: 'checkEmptyBlocks', issues: program.checkEmptyBlocks() },
    { name: 'checkPreferConst', issues: program.checkPreferConst() },
  ];

  for (const { name, issues } of runs) {
    console.log(`${name}:`);
    if (issues.length === 0) {
      console.log('  no issues found');
    } else {
      issues.forEach((issue) => {
        console.log(`  [${issue.rule}] ${issue.message}`);
      });
    }
    console.log('');
  }

  console.log(' Problems with this approach:');
  console.log('  - Every new rule (NoConsoleLog, MaxDepth, …) forces edits to every AST node class');
  console.log('  - Rule logic is scattered across the hierarchy instead of being colocated');
  console.log('  - AST classes mix structural data with rule enforcement (violates SRP)');
  console.log('  - Adding a rule means touching N classes instead of writing 1 visitor');
  console.log('  - Violates Open/Closed — the hierarchy is never really closed for modification');
}

main();

export {};
