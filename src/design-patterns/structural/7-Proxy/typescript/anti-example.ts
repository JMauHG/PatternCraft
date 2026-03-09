// ❌ BAD: No Proxy - Client handles caching, logging, and init manually

class DatabaseService {
  constructor() {
    console.log('  [DB] Establishing database connection... (slow)');
  }

  public query(sql: string): string {
    console.log(`  [DB] Executing: ${sql}`);
    return `Result of "${sql}"`;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Proxy (Manual Cross-Cutting Concerns) ===\n');

  // Client must manage everything itself
  let db: DatabaseService | null = null;
  const cache: Map<string, string> = new Map();
  const queryLog: string[] = [];

  // Helper that the client must remember to use everywhere
  function executeQuery(sql: string): string {
    queryLog.push(sql);
    console.log(`  [Client] Log: query #${queryLog.length} — ${sql}`);

    if (cache.has(sql)) {
      console.log('  [Client] Cache hit — returning cached result');
      return cache.get(sql)!;
    }

    // Lazy init scattered in client code
    if (!db) {
      db = new DatabaseService();
    }

    const result = db.query(sql);
    cache.set(sql, result);
    return result;
  }

  console.log('--- First query ---\n');
  const r1 = executeQuery('SELECT * FROM users');
  console.log(`  Result: ${r1}\n`);

  console.log('--- Same query again ---\n');
  const r2 = executeQuery('SELECT * FROM users');
  console.log(`  Result: ${r2}\n`);

  console.log('--- Different query ---\n');
  const r3 = executeQuery('SELECT * FROM orders');
  console.log(`  Result: ${r3}\n`);

  console.log(`--- Query log: ${queryLog.length} queries recorded ---`);
  queryLog.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));

  console.log('\n Problems with this approach:');
  console.log('  - Caching logic is mixed into client code');
  console.log('  - Logging is scattered and must be duplicated everywhere');
  console.log('  - Lazy init is the client\'s responsibility — easy to forget');
  console.log('  - Every new caller must reimplement all cross-cutting concerns');
}

main();

export {};
