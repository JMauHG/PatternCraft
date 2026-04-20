// ❌ BAD: Buttons call editor methods directly - no undo, no command history

class Editor {
  private text: string = '';
  private clipboard: string = '';

  public getText(): string {
    return this.text;
  }

  public type(input: string): void {
    this.text += input;
  }

  public copy(): void {
    this.clipboard = this.text;
  }

  public paste(): void {
    this.text += this.clipboard;
  }

  public getClipboard(): string {
    return this.clipboard;
  }
}

// Buttons call the editor directly - tightly coupled and no undo support
class TypeButton {
  private editor: Editor;
  private input: string;

  constructor(editor: Editor, input: string) {
    this.editor = editor;
    this.input = input;
  }

  public click(): void {
    this.editor.type(this.input);
  }
}

class CopyButton {
  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public click(): void {
    this.editor.copy();
  }
}

class PasteButton {
  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public click(): void {
    this.editor.paste();
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Buttons Directly Calling Editor ===\n');

  const editor = new Editor();

  const typeHello = new TypeButton(editor, 'Hello');
  const typeWorld = new TypeButton(editor, ', World!');
  const copyBtn = new CopyButton(editor);
  const pasteBtn = new PasteButton(editor);
  const typeSpace = new TypeButton(editor, ' ');

  typeHello.click();
  console.log(`After typing 'Hello': "${editor.getText()}"`);

  typeWorld.click();
  console.log(`After typing ', World!': "${editor.getText()}"`);

  copyBtn.click();
  console.log(`After copy: clipboard = "${editor.getClipboard()}"`);

  typeSpace.click();
  pasteBtn.click();
  console.log(`After paste: "${editor.getText()}"`);

  console.log('');
  console.log('--- Trying to undo... ---');
  console.log('There is no way to undo. Each action is lost forever.');

  console.log('\n Problems with this approach:');
  console.log('  - No undo/redo support - actions cannot be reversed');
  console.log('  - Buttons are tightly coupled to the editor implementation');
  console.log('  - Operations cannot be queued, logged, or replayed');
  console.log('  - Adding macros (sequences of actions) requires custom button classes');
  console.log('  - No way to serialize user actions for remote execution or analytics');
}

main();

export {};
