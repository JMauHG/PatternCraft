// ❌ BAD: No Abstract Factory - Theme logic scattered throughout code

// ===== Concrete Components with theme logic embedded =====
class Button {
  constructor(private theme: string) {}

  render(): void {
    // Theme logic mixed with component logic
    if (this.theme === 'dark') {
      console.log('  🟪 Rendering Dark Button');
    } else if (this.theme === 'light') {
      console.log('  ⬜ Rendering Light Button');
    }
  }
}

class Card {
  constructor(private theme: string) {}

  render(): void {
    // Theme logic duplicated in each component
    if (this.theme === 'dark') {
      console.log('  ⬛ Rendering Dark Card');
    } else if (this.theme === 'light') {
      console.log('  📄 Rendering Light Card');
    }
  }
}

// ===== Client Code =====
class UI {
  constructor(private theme: string) {}

  renderScreen(): void {
    // Client must pass theme to every component
    const button = new Button(this.theme);
    const card = new Card(this.theme);

    button.render();
    card.render();
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: No Abstract Factory ===\n');

  const theme = Math.random() > 0.5 ? 'dark' : 'light';

  console.log(`Selected theme: ${theme.toUpperCase()}\n`);

  const ui = new UI(theme);

  console.log('Rendering UI components:');
  ui.renderScreen();

  console.log('\n Problems with this approach:');
  console.log('  - Theme logic is scattered across all components');
  console.log('  - Adding new theme requires modifying every component class');
  console.log('  - Theme parameter must be passed everywhere');
  console.log('  - Risk of inconsistency (mixing themes by mistake)');
  console.log('  - Violates Open/Closed Principle');
  console.log('  - Hard to test individual theme implementations');
}

main();

export {};
