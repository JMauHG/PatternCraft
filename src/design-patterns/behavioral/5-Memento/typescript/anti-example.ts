// ❌ BAD: No Memento - Exposing editor internals so the caller saves/restores state directly

class Editor {
  // All state is public so the caller can read and write it
  public content: string;
  public cursorPosition: number;

  constructor() {
    this.content = '';
    this.cursorPosition = 0;
  }

  public type(text: string): void {
    this.content =
      this.content.slice(0, this.cursorPosition) +
      text +
      this.content.slice(this.cursorPosition);
    this.cursorPosition += text.length;
  }
}

// The caller has to manually copy and paste state around
type RawState = {
  content: string;
  cursorPosition: number;
};

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Editor Without Memento ===\n');

  const editor = new Editor();
  const history: RawState[] = [];

  editor.type('Hello');
  // Caller reaches into private-looking state directly
  history.push({ content: editor.content, cursorPosition: editor.cursorPosition });
  console.log(`After typing "Hello": "${editor.content}"`);

  editor.type(', world');
  history.push({ content: editor.content, cursorPosition: editor.cursorPosition });
  console.log(`After typing ", world": "${editor.content}"`);

  editor.type('!');
  console.log(`After typing "!": "${editor.content}"`);

  // Undo: caller manually mutates editor fields
  console.log('');
  const prev = history.pop();
  if (prev) {
    editor.content = prev.content;
    editor.cursorPosition = prev.cursorPosition;
  }
  console.log(`After 1st undo: "${editor.content}"`);

  const prev2 = history.pop();
  if (prev2) {
    editor.content = prev2.content;
    editor.cursorPosition = prev2.cursorPosition;
  }
  console.log(`After 2nd undo: "${editor.content}"`);

  console.log('\n Problems with this approach:');
  console.log('  - Editor internals are fully exposed — anyone can mutate them');
  console.log('  - Caller must know exactly which fields define the state');
  console.log('  - Adding a new field means updating every save/restore call site');
  console.log('  - No encapsulation — invariants can be broken from outside');
  console.log('  - Restore logic is duplicated everywhere undo is performed');
}

main();

export {};
