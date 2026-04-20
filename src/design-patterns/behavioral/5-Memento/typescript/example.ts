// ✅ GOOD: Memento Pattern - Capture and restore state without breaking encapsulation

// Memento: stores a snapshot of the Editor's state
interface EditorMemento {
  getName(): string;
}

class EditorSnapshot implements EditorMemento {
  private readonly content: string;
  private readonly cursorPosition: number;
  private readonly createdAt: Date;

  constructor(content: string, cursorPosition: number) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.createdAt = new Date();
  }

  // Only the Editor uses these methods to restore its state
  public getContent(): string {
    return this.content;
  }

  public getCursorPosition(): number {
    return this.cursorPosition;
  }

  // Safe metadata the caretaker can display
  public getName(): string {
    return `Snapshot @ ${this.createdAt.toISOString()} (${this.content.length} chars)`;
  }
}

// Originator: the Editor whose state we want to snapshot
class Editor {
  private content: string;
  private cursorPosition: number;

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

  public moveCursor(position: number): void {
    this.cursorPosition = Math.max(0, Math.min(position, this.content.length));
  }

  public getContent(): string {
    return this.content;
  }

  public getCursorPosition(): number {
    return this.cursorPosition;
  }

  // Creates a memento with the current state
  public save(): EditorMemento {
    return new EditorSnapshot(this.content, this.cursorPosition);
  }

  // Restores state from a memento
  public restore(memento: EditorMemento): void {
    const snapshot = memento as EditorSnapshot;
    this.content = snapshot.getContent();
    this.cursorPosition = snapshot.getCursorPosition();
  }
}

// Caretaker: manages the history of mementos without inspecting them
class History {
  private editor: Editor;
  private snapshots: EditorMemento[];

  constructor(editor: Editor) {
    this.editor = editor;
    this.snapshots = [];
  }

  public backup(): void {
    this.snapshots.push(this.editor.save());
  }

  public undo(): void {
    if (this.snapshots.length === 0) {
      return;
    }
    const memento = this.snapshots.pop()!;
    this.editor.restore(memento);
  }

  public showHistory(): void {
    console.log('History:');
    this.snapshots.forEach((m, i) => console.log(`  ${i + 1}. ${m.getName()}`));
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Memento Pattern: Text Editor Undo ===\n');

  const editor = new Editor();
  const history = new History(editor);

  editor.type('Hello');
  history.backup();
  console.log(`After typing "Hello": "${editor.getContent()}"`);

  editor.type(', world');
  history.backup();
  console.log(`After typing ", world": "${editor.getContent()}"`);

  editor.type('!');
  console.log(`After typing "!": "${editor.getContent()}"`);

  console.log('');
  history.showHistory();

  console.log('');
  history.undo();
  console.log(`After 1st undo: "${editor.getContent()}"`);

  history.undo();
  console.log(`After 2nd undo: "${editor.getContent()}"`);

  console.log('\n Benefits of Memento Pattern:');
  console.log('  - Editor internals stay private — History cannot modify them');
  console.log('  - Undo/redo history is isolated in the caretaker');
  console.log('  - Editor focuses on editing; History focuses on state management');
  console.log('  - New snapshot fields can be added without changing the caretaker');
  console.log('  - Safe rollback to any previous state');
}

main();

export {};
