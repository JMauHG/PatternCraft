// ✅ GOOD: Iterator Pattern - Uniform traversal over different social networks

interface Profile {
  getName(): string;
  getEmail(): string;
}

class SocialProfile implements Profile {
  private name: string;
  private email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }
}

interface ProfileIterator {
  hasNext(): boolean;
  next(): Profile;
}

interface SocialNetwork {
  createFriendsIterator(profileId: string): ProfileIterator;
}

class FacebookIterator implements ProfileIterator {
  private friends: Profile[];
  private position: number = 0;

  constructor(friends: Profile[]) {
    this.friends = friends;
  }

  public hasNext(): boolean {
    return this.position < this.friends.length;
  }

  public next(): Profile {
    const profile = this.friends[this.position];
    this.position++;
    return profile;
  }
}

class LinkedInIterator implements ProfileIterator {
  private contacts: Map<number, Profile>;
  private keys: number[];
  private cursor: number = 0;

  constructor(contacts: Map<number, Profile>) {
    this.contacts = contacts;
    this.keys = Array.from(contacts.keys()).sort((a, b) => a - b);
  }

  public hasNext(): boolean {
    return this.cursor < this.keys.length;
  }

  public next(): Profile {
    const key = this.keys[this.cursor];
    this.cursor++;
    return this.contacts.get(key)!;
  }
}

class Facebook implements SocialNetwork {
  // Internal structure: plain array
  private friendsByUser: Map<string, Profile[]> = new Map();

  public addFriends(profileId: string, friends: Profile[]): void {
    this.friendsByUser.set(profileId, friends);
  }

  public createFriendsIterator(profileId: string): ProfileIterator {
    const friends = this.friendsByUser.get(profileId) ?? [];
    return new FacebookIterator(friends);
  }
}

class LinkedIn implements SocialNetwork {
  // Internal structure: a map keyed by numeric connection IDs
  private contactsByUser: Map<string, Map<number, Profile>> = new Map();

  public addContacts(profileId: string, contacts: Map<number, Profile>): void {
    this.contactsByUser.set(profileId, contacts);
  }

  public createFriendsIterator(profileId: string): ProfileIterator {
    const contacts = this.contactsByUser.get(profileId) ?? new Map();
    return new LinkedInIterator(contacts);
  }
}

// Client code works with any social network through the same iterator interface
function sendGreetings(network: SocialNetwork, profileId: string, networkName: string): void {
  const iterator = network.createFriendsIterator(profileId);
  console.log(`--- Greeting ${networkName} connections ---`);
  while (iterator.hasNext()) {
    const profile = iterator.next();
    console.log(`Hi ${profile.getName()} (${profile.getEmail()})`);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Iterator Pattern: Social Network Profiles ===\n');

  const facebook = new Facebook();
  facebook.addFriends('alice', [
    new SocialProfile('Bob', 'bob@fb.com'),
    new SocialProfile('Carol', 'carol@fb.com'),
    new SocialProfile('Dave', 'dave@fb.com'),
  ]);

  const linkedIn = new LinkedIn();
  const linkedInContacts = new Map<number, Profile>();
  linkedInContacts.set(101, new SocialProfile('Eve', 'eve@li.com'));
  linkedInContacts.set(42, new SocialProfile('Frank', 'frank@li.com'));
  linkedInContacts.set(77, new SocialProfile('Grace', 'grace@li.com'));
  linkedIn.addContacts('alice', linkedInContacts);

  sendGreetings(facebook, 'alice', 'Facebook');
  console.log('');
  sendGreetings(linkedIn, 'alice', 'LinkedIn');

  console.log('\n Benefits of Iterator Pattern:');
  console.log('  - Client code uses the same API for very different collections');
  console.log('  - Collection internals (array vs map) stay encapsulated');
  console.log('  - Traversal state lives in the iterator, not in the client');
  console.log('  - Multiple iterators can traverse the same collection independently');
  console.log('  - New collection types can be added without changing client code');
}

main();

export {};
