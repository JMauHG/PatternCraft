// ✅ GOOD: Proxy Pattern - Controls access with lazy init, caching, and logging

// Service interface shared by the real service and the proxy
interface DatabaseService {
  query(sql: string): string;
}

// Real service: expensive to create, performs actual database queries
class RealDatabaseService implements DatabaseService {
  constructor() {
    // Simulates expensive connection setup
    console.log('  [RealDB] Establishing database connection... (slow)');
  }

  public query(sql: string): string {
    console.log(`  [RealDB] Executing: ${sql}`);
    return `Result of "${sql}"`;
  }
}

// Proxy: adds lazy initialization, caching, and logging transparently
class DatabaseProxy implements DatabaseService {
  private realService: RealDatabaseService | null = null;
  private cache: Map<string, string> = new Map();
  private queryLog: string[] = [];

  // Lazy init: only creates the real service on first use
  private getService(): RealDatabaseService {
    if (!this.realService) {
      this.realService = new RealDatabaseService();
    }
    return this.realService;
  }

  public query(sql: string): string {
    // Logging
    this.queryLog.push(sql);
    console.log(`  [Proxy] Log: query #${this.queryLog.length} — ${sql}`);

    // Caching
    if (this.cache.has(sql)) {
      console.log('  [Proxy] Cache hit — returning cached result');
      return this.cache.get(sql)!;
    }

    // Delegate to real service
    const result = this.getService().query(sql);
    this.cache.set(sql, result);
    return result;
  }

  public getQueryLog(): string[] {
    return [...this.queryLog];
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Proxy Pattern: Database Service ===\n');

  const db: DatabaseService = new DatabaseProxy();

  console.log('--- First query (triggers lazy init + cache miss) ---\n');
  const r1 = db.query('SELECT * FROM users');
  console.log(`  Result: ${r1}\n`);

  console.log('--- Same query again (cache hit, no DB call) ---\n');
  const r2 = db.query('SELECT * FROM users');
  console.log(`  Result: ${r2}\n`);

  console.log('--- Different query (cache miss) ---\n');
  const r3 = db.query('SELECT * FROM orders');
  console.log(`  Result: ${r3}\n`);

  // Access proxy-specific features
  const proxy = db as DatabaseProxy;
  console.log(`--- Query log: ${proxy.getQueryLog().length} queries recorded ---`);
  proxy.getQueryLog().forEach((q, i) => console.log(`  ${i + 1}. ${q}`));

  console.log('\n Benefits of Proxy Pattern:');
  console.log('  - Database connection is created only when first needed (lazy init)');
  console.log('  - Repeated queries return cached results (caching)');
  console.log('  - All queries are logged transparently (logging)');
  console.log('  - Client uses the same DatabaseService interface — no code changes');
}

main();

export {};
