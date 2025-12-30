// ✅ GOOD: Singleton Pattern - Guarantees a single instance of a class

class Database {
  private static instance: Database | null = null;

  // Make constructor private to prevent direct creation
  private constructor() {
    console.log('Database connected');
  }

  // Provides global access point to the instance
  public static getInstance(): Database {
    if (!Database.instance) {
      console.log('Getting instance');
      // acquireThreadLock() (if needed for multi-threaded environments)
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Singleton Pattern: Database Connection ===\n');

  const db1 = Database.getInstance();
  const db2 = Database.getInstance();

  // Verify both are the same instance
  console.log(`\nAre db1 and db2 the same instance? ${db1 === db2}`);

  console.log('\n Benefits of Singleton Pattern:');
  console.log('  - Only ONE database connection is created');
  console.log('  - All parts of the app share the same instance');
  console.log('  - Resource efficient (no duplicate connections)');
  console.log('  - Global access point via getInstance()');
  console.log('  - Lazy initialization (created only when needed)');
}

main();

export {};
