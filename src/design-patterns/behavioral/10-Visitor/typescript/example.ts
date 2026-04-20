// ✅ GOOD: Visitor Pattern - Run many lint rules over the same AST without touching the nodes

interface LintIssue {
  rule: string;
  message: string;
}

// Visitor interface — one method per concrete AST node type
interface LinterVisitor {
  visitVariableDeclaration(node: VariableDeclaration): void;
  visitFunctionDeclaration(node: FunctionDeclaration): void;
  visitIfStatement(node: IfStatement): void;
  visitBlock(node: Block): void;
  getIssues(): LintIssue[];
}

// Element interface — every AST node accepts a visitor
interface AstNode {
  accept(visitor: LinterVisitor): void;
}

class VariableDeclaration implements AstNode {
  private name: string;
  private kind: 'let' | 'const';

  constructor(name: string, kind: 'let' | 'const') {
    this.name = name;
    this.kind = kind;
  }

  public getName(): string {
    return this.name;
  }

  public getKind(): 'let' | 'const' {
    return this.kind;
  }

  public accept(visitor: LinterVisitor): void {
    visitor.visitVariableDeclaration(this);
  }
}

class FunctionDeclaration implements AstNode {
  private name: string;
  private body: Block;

  constructor(name: string, body: Block) {
    this.name = name;
    this.body = body;
  }

  public getName(): string {
    return this.name;
  }

  public getBody(): Block {
    return this.body;
  }

  public accept(visitor: LinterVisitor): void {
    visitor.visitFunctionDeclaration(this);
    this.body.accept(visitor);
  }
}

class IfStatement implements AstNode {
  private condition: string;
  private body: Block;

  constructor(condition: string, body: Block) {
    this.condition = condition;
    this.body = body;
  }

  public getCondition(): string {
    return this.condition;
  }

  public getBody(): Block {
    return this.body;
  }

  public accept(visitor: LinterVisitor): void {
    visitor.visitIfStatement(this);
    this.body.accept(visitor);
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

  public accept(visitor: LinterVisitor): void {
    visitor.visitBlock(this);
    this.statements.forEach((stmt) => stmt.accept(visitor));
  }
}

// Concrete visitor 1 — names must be camelCase
class NamingConventionLinter implements LinterVisitor {
  private issues: LintIssue[] = [];

  public visitVariableDeclaration(node: VariableDeclaration): void {
    if (!this.isCamelCase(node.getName())) {
      this.issues.push({ rule: 'naming', message: `variable "${node.getName()}" should be camelCase` });
    }
  }

  public visitFunctionDeclaration(node: FunctionDeclaration): void {
    if (!this.isCamelCase(node.getName())) {
      this.issues.push({ rule: 'naming', message: `function "${node.getName()}" should be camelCase` });
    }
  }

  public visitIfStatement(_node: IfStatement): void {
    // not relevant to this rule
  }

  public visitBlock(_node: Block): void {
    // not relevant to this rule
  }

  public getIssues(): LintIssue[] {
    return this.issues;
  }

  private isCamelCase(name: string): boolean {
    return /^[a-z][a-zA-Z0-9]*$/.test(name);
  }
}

// Concrete visitor 2 — blocks must not be empty
class EmptyBlockLinter implements LinterVisitor {
  private issues: LintIssue[] = [];

  public visitVariableDeclaration(_node: VariableDeclaration): void {}
  public visitFunctionDeclaration(_node: FunctionDeclaration): void {}

  public visitIfStatement(node: IfStatement): void {
    if (node.getBody().getStatements().length === 0) {
      this.issues.push({ rule: 'empty-block', message: `if (${node.getCondition()}) has an empty body` });
    }
  }

  public visitBlock(_node: Block): void {}

  public getIssues(): LintIssue[] {
    return this.issues;
  }
}

// Concrete visitor 3 — prefer const over let
class PreferConstLinter implements LinterVisitor {
  private issues: LintIssue[] = [];

  public visitVariableDeclaration(node: VariableDeclaration): void {
    if (node.getKind() === 'let') {
      this.issues.push({
        rule: 'prefer-const',
        message: `"${node.getName()}" is declared with let — prefer const`,
      });
    }
  }

  public visitFunctionDeclaration(_node: FunctionDeclaration): void {}
  public visitIfStatement(_node: IfStatement): void {}
  public visitBlock(_node: Block): void {}

  public getIssues(): LintIssue[] {
    return this.issues;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Visitor Pattern: Linting an AST ===\n');

  // Simulated source:
  //   function My_Func() {
  //     let count = 0;
  //     if (count > 0) { }
  //   }
  const emptyIfBody = new Block([]);
  const ifStmt = new IfStatement('count > 0', emptyIfBody);
  const countDecl = new VariableDeclaration('count', 'let');
  const functionBody = new Block([countDecl, ifStmt]);
  const badFunction = new FunctionDeclaration('My_Func', functionBody);

  const program = new Block([badFunction]);

  const linters: LinterVisitor[] = [
    new NamingConventionLinter(),
    new EmptyBlockLinter(),
    new PreferConstLinter(),
  ];

  for (const linter of linters) {
    program.accept(linter);
    console.log(`${linter.constructor.name}:`);
    const issues = linter.getIssues();
    if (issues.length === 0) {
      console.log('  no issues found');
    } else {
      issues.forEach((issue) => {
        console.log(`  [${issue.rule}] ${issue.message}`);
      });
    }
    console.log('');
  }

  console.log(' Benefits of Visitor Pattern:');
  console.log('  - Each lint rule lives in its own visitor, not sprinkled across AST nodes');
  console.log('  - New rules (NoConsoleLog, MaxDepth, NoUnused) mean writing a new visitor only');
  console.log('  - AST classes stay focused on structure, not on rule enforcement');
  console.log('  - Related rule logic is colocated instead of scattered across node types');
  console.log('  - Follows Open/Closed and Single Responsibility');
}

main();

export {};
