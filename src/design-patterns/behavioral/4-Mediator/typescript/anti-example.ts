// ❌ BAD: Users hold references to every peer and call each other directly (N×N coupling)

class User {
  private name: string;
  private peers: User[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  // Every user must know about every other user
  public addPeer(peer: User): void {
    this.peers.push(peer);
  }

  public broadcast(message: string): void {
    for (const peer of this.peers) {
      peer.receive(this.name, message);
    }
  }

  public sendTo(target: User, message: string): void {
    target.receive(this.name, message);
  }

  public receive(from: string, message: string): void {
    console.log(`[${this.name}] got message from ${from}: "${message}"`);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Users Calling Each Other Directly ===\n');

  const alice = new User('Alice');
  const bob = new User('Bob');
  const carol = new User('Carol');
  const dave = new User('Dave');

  // Manually wiring every user to every other user - O(N^2) connections
  alice.addPeer(bob);
  alice.addPeer(carol);
  alice.addPeer(dave);

  bob.addPeer(alice);
  bob.addPeer(carol);
  bob.addPeer(dave);

  carol.addPeer(alice);
  carol.addPeer(bob);
  carol.addPeer(dave);

  dave.addPeer(alice);
  dave.addPeer(bob);
  dave.addPeer(carol);

  console.log('--- Alice broadcasts ---');
  alice.broadcast('Hello everyone!');

  console.log('');
  console.log('--- Bob sends a direct message to Carol ---');
  bob.sendTo(carol, 'Carol, can we talk?');

  console.log('');
  console.log('--- Dave broadcasts ---');
  dave.broadcast('Good morning team');

  console.log('\n Problems with this approach:');
  console.log('  - Each user must know about every other user (N×N coupling)');
  console.log('  - Adding a new user requires updating every existing user');
  console.log('  - Routing and delivery rules are duplicated in every User class');
  console.log('  - Users cannot be reused outside this exact group');
  console.log('  - No central place to log, moderate, or extend the interaction');
}

main();

export {};
