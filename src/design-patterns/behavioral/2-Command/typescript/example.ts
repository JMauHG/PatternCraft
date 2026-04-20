// ✅ GOOD: Command Pattern - Text editor with copy/paste/undo via command objects

class Editor {
  private text: string = '';
  private clipboard: string = '';

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
  }

  public getClipboard(): string {
    return this.clipboard;
  }

  public setClipboard(content: string): void {
    this.clipboard = content;
  }
}

interface Command {
  execute(): void;
  undo(): void;
}

class TypeCommand implements Command {
  private editor: Editor;
  private input: string;
  private previousText: string = '';

  constructor(editor: Editor, input: string) {
    this.editor = editor;
    this.input = input;
  }

  public execute(): void {
    this.previousText = this.editor.getText();
    this.editor.setText(this.previousText + this.input);
  }

  public undo(): void {
    this.editor.setText(this.previousText);
  }
}

class CopyCommand implements Command {
  private editor: Editor;
  private previousClipboard: string = '';

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public execute(): void {
    this.previousClipboard = this.editor.getClipboard();
    this.editor.setClipboard(this.editor.getText());
  }

  public undo(): void {
    this.editor.setClipboard(this.previousClipboard);
  }
}

class PasteCommand implements Command {
  private editor: Editor;
  private previousText: string = '';

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public execute(): void {
    this.previousText = this.editor.getText();
    this.editor.setText(this.previousText + this.editor.getClipboard());
  }

  public undo(): void {
    this.editor.setText(this.previousText);
  }
}

class CommandHistory {
  private history: Command[] = [];

  public push(command: Command): void {
    this.history.push(command);
  }

  public pop(): Command | undefined {
    return this.history.pop();
  }

  public size(): number {
    return this.history.length;
  }
}

class Application {
  private editor: Editor;
  private history: CommandHistory;

  constructor(editor: Editor, history: CommandHistory) {
    this.editor = editor;
    this.history = history;
  }

  public executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  public undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Command Pattern: Text Editor with Undo ===\n');

  const editor = new Editor();
  const history = new CommandHistory();
  const app = new Application(editor, history);

  app.executeCommand(new TypeCommand(editor, 'Hello'));
  console.log(`After typing 'Hello': "${editor.getText()}"`);

  app.executeCommand(new TypeCommand(editor, ', World!'));
  console.log(`After typing ', World!': "${editor.getText()}"`);

  app.executeCommand(new CopyCommand(editor));
  console.log(`After copy: clipboard = "${editor.getClipboard()}"`);

  app.executeCommand(new TypeCommand(editor, ' '));
  app.executeCommand(new PasteCommand(editor));
  console.log(`After paste: "${editor.getText()}"`);

  console.log('');
  console.log('--- Undoing all operations ---');

  app.undo();
  console.log(`After undo: "${editor.getText()}"`);

  app.undo();
  console.log(`After undo: "${editor.getText()}"`);

  app.undo();
  console.log(`After undo: clipboard = "${editor.getClipboard()}", text = "${editor.getText()}"`);

  app.undo();
  console.log(`After undo: "${editor.getText()}"`);

  app.undo();
  console.log(`After undo: "${editor.getText()}"`);

  console.log('\n Benefits of Command Pattern:');
  console.log('  - Each action is a self-contained object with execute and undo');
  console.log('  - Undo/redo support comes naturally from a command history');
  console.log('  - Invoker (Application) is decoupled from concrete operations');
  console.log('  - New commands can be added without modifying the editor or invoker');
  console.log('  - Commands can be queued, logged, or serialized for replay');
}

main();

export {};
