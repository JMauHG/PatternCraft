// ❌ BAD: No Singleton - Multiple instances are created

class Database {
  private connectionId: number;

  // Public constructor allows creating multiple instances
  constructor() {
    this.connectionId = Math.floor(Math.random() * 10000);
    console.log('Database connected');
  }

  public getConnectionId(): number {
    console.log('Getting instance');
    return this.connectionId;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Multiple Database Instances ===\n');

  const db1 = new Database();
  const db2 = new Database();

  console.log(`\nAre db1 and db2 the same instance? ${db1 === db2}`);
  console.log(`db1 connection ID: ${db1.getConnectionId()}`);
  console.log(`db2 connection ID: ${db2.getConnectionId()}`);

  console.log('\n Problems with this approach:');
  console.log('  - Multiple database connections are created (resource waste)');
  console.log('  - No control over how many instances exist');
  console.log('  - Connection pool limits can be exceeded');
  console.log('  - Memory leaks if connections are not properly closed');
}

main();

export {};
