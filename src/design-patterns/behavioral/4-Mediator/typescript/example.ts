// ✅ GOOD: Mediator Pattern - Chat room coordinates messages between users

interface ChatMediator {
  register(user: User): void;
  send(from: string, message: string, to?: string): void;
}

abstract class User {
  protected name: string;
  protected mediator: ChatMediator;

  constructor(name: string, mediator: ChatMediator) {
    this.name = name;
    this.mediator = mediator;
  }

  public getName(): string {
    return this.name;
  }

  public send(message: string, to?: string): void {
    this.mediator.send(this.name, message, to);
  }

  public abstract receive(from: string, message: string): void;
}

class ChatUser extends User {
  public receive(from: string, message: string): void {
    console.log(`[${this.name}] got message from ${from}: "${message}"`);
  }
}

class ChatRoom implements ChatMediator {
  private users: Map<string, User> = new Map();

  public register(user: User): void {
    this.users.set(user.getName(), user);
  }

  public send(from: string, message: string, to?: string): void {
    if (to) {
      // Direct message
      const recipient = this.users.get(to);
      if (recipient) {
        recipient.receive(from, message);
      } else {
        console.log(`[ChatRoom] user "${to}" not found`);
      }
      return;
    }

    // Broadcast to everyone except the sender
    for (const [name, user] of this.users) {
      if (name !== from) {
        user.receive(from, message);
      }
    }
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Mediator Pattern: Chat Room ===\n');

  const chatRoom = new ChatRoom();

  const alice = new ChatUser('Alice', chatRoom);
  const bob = new ChatUser('Bob', chatRoom);
  const carol = new ChatUser('Carol', chatRoom);
  const dave = new ChatUser('Dave', chatRoom);

  chatRoom.register(alice);
  chatRoom.register(bob);
  chatRoom.register(carol);
  chatRoom.register(dave);

  console.log('--- Alice broadcasts ---');
  alice.send('Hello everyone!');

  console.log('');
  console.log('--- Bob sends a direct message to Carol ---');
  bob.send('Carol, can we talk?', 'Carol');

  console.log('');
  console.log('--- Dave broadcasts ---');
  dave.send('Good morning team');

  console.log('');
  console.log('--- Message to a missing user ---');
  alice.send('Are you there?', 'Zoe');

  console.log('\n Benefits of Mediator Pattern:');
  console.log('  - Users only depend on the ChatRoom, not on each other');
  console.log('  - Adding a new user type does not touch existing users');
  console.log('  - Routing logic (broadcast vs direct) lives in one place');
  console.log('  - Users become reusable in other mediators (e.g., a different chat app)');
  console.log('  - Testing a user is easy with a mock ChatMediator');
}

main();

export {};
