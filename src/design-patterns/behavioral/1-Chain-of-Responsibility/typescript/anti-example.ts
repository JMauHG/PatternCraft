// ❌ BAD: Monolithic authorization function with nested if/else branches

interface HttpRequest {
  url: string;
  user?: { name: string; role: string };
  password?: string;
  ip: string;
}

const requestCount: Map<string, number> = new Map();

// One giant function that knows about every concern at once
function handleRequest(request: HttpRequest): string {
  // Auth check
  if (!request.user || request.password !== 'secret') {
    return 'Rejected - invalid credentials';
  } else {
    // Role check nested inside auth check
    if (request.user.role !== 'admin') {
      return 'Rejected - admin role required';
    } else {
      // Throttling nested inside role check
      const count = (requestCount.get(request.ip) ?? 0) + 1;
      requestCount.set(request.ip, count);
      if (count > 2) {
        return `Rejected - rate limit exceeded for ${request.ip}`;
      } else {
        // Final handling nested inside throttling
        return `Serving response for ${request.url}`;
      }
    }
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Monolithic Authorization Function ===\n');

  const adminRequest: HttpRequest = {
    url: '/admin/dashboard',
    user: { name: 'Alice', role: 'admin' },
    password: 'secret',
    ip: '10.0.0.1',
  };

  const guestRequest: HttpRequest = {
    url: '/admin/dashboard',
    user: { name: 'Bob', role: 'guest' },
    password: 'secret',
    ip: '10.0.0.2',
  };

  const invalidRequest: HttpRequest = {
    url: '/admin/dashboard',
    ip: '10.0.0.3',
  };

  console.log('--- Admin request ---');
  console.log(handleRequest(adminRequest));

  console.log('--- Admin request (again) ---');
  console.log(handleRequest(adminRequest));

  console.log('--- Admin request (rate limited) ---');
  console.log(handleRequest(adminRequest));

  console.log('--- Guest request ---');
  console.log(handleRequest(guestRequest));

  console.log('--- Unauthenticated request ---');
  console.log(handleRequest(invalidRequest));

  console.log('\n Problems with this approach:');
  console.log('  - All concerns (auth, role, throttling) live in one function');
  console.log('  - Adding a new check means modifying the existing function (violates Open/Closed)');
  console.log('  - Reordering checks requires rewriting nested branches');
  console.log('  - The function is hard to test in isolation');
  console.log('  - Shared mutable state (requestCount) is tangled with business logic');
}

main();

export {};
