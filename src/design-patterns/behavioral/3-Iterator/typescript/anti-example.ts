// ❌ BAD: Client code reaches into each collection's internals with different APIs

class Profile {
  public name: string;
  public email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

class Facebook {
  // Internals exposed directly
  public friends: Profile[] = [];

  public addFriend(profile: Profile): void {
    this.friends.push(profile);
  }
}

class LinkedIn {
  // Different internal structure, also exposed
  public contacts: Map<number, Profile> = new Map();

  public addContact(id: number, profile: Profile): void {
    this.contacts.set(id, profile);
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Direct Access to Collection Internals ===\n');

  const facebook = new Facebook();
  facebook.addFriend(new Profile('Bob', 'bob@fb.com'));
  facebook.addFriend(new Profile('Carol', 'carol@fb.com'));
  facebook.addFriend(new Profile('Dave', 'dave@fb.com'));

  const linkedIn = new LinkedIn();
  linkedIn.addContact(101, new Profile('Eve', 'eve@li.com'));
  linkedIn.addContact(42, new Profile('Frank', 'frank@li.com'));
  linkedIn.addContact(77, new Profile('Grace', 'grace@li.com'));

  // Facebook traversal: index-based for loop over an array
  console.log('--- Greeting Facebook connections ---');
  for (let i = 0; i < facebook.friends.length; i++) {
    const profile = facebook.friends[i];
    console.log(`Hi ${profile.name} (${profile.email})`);
  }

  console.log('');

  // LinkedIn traversal: totally different API - client has to know it's a Map
  console.log('--- Greeting LinkedIn connections ---');
  const sortedKeys = Array.from(linkedIn.contacts.keys()).sort((a, b) => a - b);
  for (const key of sortedKeys) {
    const profile = linkedIn.contacts.get(key)!;
    console.log(`Hi ${profile.name} (${profile.email})`);
  }

  console.log('\n Problems with this approach:');
  console.log('  - Client must learn a different traversal API per collection');
  console.log('  - Changing a collection type breaks every client that iterates it');
  console.log('  - Internal data structures are exposed as public fields');
  console.log('  - Adding a new social network forces duplicated iteration code everywhere');
  console.log('  - Impossible to have multiple traversal strategies cleanly');
}

main();

export {};
