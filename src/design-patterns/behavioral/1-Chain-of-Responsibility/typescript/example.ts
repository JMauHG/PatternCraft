// ✅ GOOD: Chain of Responsibility - HTTP middleware pipeline with decoupled handlers

interface HttpRequest {
  url: string;
  user?: { name: string; role: string };
  password?: string;
  ip: string;
}

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: HttpRequest): string | null;
}

abstract class BaseHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: HttpRequest): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class AuthHandler extends BaseHandler {
  public handle(request: HttpRequest): string | null {
    if (!request.user || request.password !== 'secret') {
      return 'AuthHandler: Rejected - invalid credentials';
    }
    console.log('AuthHandler: credentials OK, passing on');
    return super.handle(request);
  }
}

class RoleHandler extends BaseHandler {
  public handle(request: HttpRequest): string | null {
    if (request.user?.role !== 'admin') {
      return 'RoleHandler: Rejected - admin role required';
    }
    console.log('RoleHandler: role OK, passing on');
    return super.handle(request);
  }
}

class ThrottlingHandler extends BaseHandler {
  private requestsPerMinute: number;
  private requestCount: Map<string, number> = new Map();

  constructor(requestsPerMinute: number) {
    super();
    this.requestsPerMinute = requestsPerMinute;
  }

  public handle(request: HttpRequest): string | null {
    const count = (this.requestCount.get(request.ip) ?? 0) + 1;
    this.requestCount.set(request.ip, count);

    if (count > this.requestsPerMinute) {
      return `ThrottlingHandler: Rejected - rate limit exceeded for ${request.ip}`;
    }
    console.log(`ThrottlingHandler: request ${count} within limit, passing on`);
    return super.handle(request);
  }
}

class FinalHandler extends BaseHandler {
  public handle(request: HttpRequest): string | null {
    return `FinalHandler: Serving response for ${request.url}`;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Chain of Responsibility: HTTP Middleware Pipeline ===\n');

  const auth = new AuthHandler();
  const role = new RoleHandler();
  const throttle = new ThrottlingHandler(2);
  const final = new FinalHandler();

  auth.setNext(role).setNext(throttle).setNext(final);

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
  console.log(auth.handle(adminRequest));
  console.log('');

  console.log('--- Admin request (again) ---');
  console.log(auth.handle(adminRequest));
  console.log('');

  console.log('--- Admin request (rate limited) ---');
  console.log(auth.handle(adminRequest));
  console.log('');

  console.log('--- Guest request ---');
  console.log(auth.handle(guestRequest));
  console.log('');

  console.log('--- Unauthenticated request ---');
  console.log(auth.handle(invalidRequest));

  console.log('\n Benefits of Chain of Responsibility:');
  console.log('  - Each handler has a single, focused responsibility');
  console.log('  - Handlers can be reordered or replaced without touching others');
  console.log('  - New handlers can be plugged in without modifying existing code');
  console.log('  - The sender is decoupled from the concrete receiver');
  console.log('  - The chain can be configured dynamically at runtime');
}

main();

export {};
