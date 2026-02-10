// ✅ GOOD: Abstract Factory Pattern - Creates families of related objects

// ===== Product Interfaces =====
interface Button {
  render(): void;
}

interface Card {
  render(): void;
}

// ===== Concrete Products for Dark Theme =====
class DarkButton implements Button {
  render(): void {
    console.log('  🟪 Rendering Dark Button');
  }
}

class DarkCard implements Card {
  render(): void {
    console.log('  ⬛ Rendering Dark Card');
  }
}

// ===== Concrete Products for Light Theme =====
class LightButton implements Button {
  render(): void {
    console.log('  ⬜ Rendering Light Button');
  }
}

class LightCard implements Card {
  render(): void {
    console.log('  📄 Rendering Light Card');
  }
}

// ===== Abstract Factory =====
interface UIComponentsFactory {
  createButton(): Button;
  createCard(): Card;
}

// ===== Concrete Factories =====
class DarkThemeFactory implements UIComponentsFactory {
  createButton(): Button {
    return new DarkButton();
  }

  createCard(): Card {
    return new DarkCard();
  }
}

class LightThemeFactory implements UIComponentsFactory {
  createButton(): Button {
    return new LightButton();
  }

  createCard(): Card {
    return new LightCard();
  }
}

// ===== Client Code (theme-agnostic) =====
class UI {
  constructor(private factory: UIComponentsFactory) {}

  renderScreen(): void {
    const button = this.factory.createButton();
    const card = this.factory.createCard();

    // App doesn't know if theme is Dark or Light
    button.render();
    card.render();
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Abstract Factory Pattern: UI Themes ===\n');

  // At runtime, you choose the theme factory
  const theme = Math.random() > 0.5 ? 'dark' : 'light';

  console.log(`Selected theme: ${theme.toUpperCase()}\n`);

  const factory: UIComponentsFactory =
    theme === 'dark' ? new DarkThemeFactory() : new LightThemeFactory();

  const ui = new UI(factory);

  console.log('Rendering UI components:');
  ui.renderScreen();

  console.log('\n Benefits of Abstract Factory Pattern:');
  console.log('  - All components are from the same theme (consistency)');
  console.log('  - UI class is decoupled from concrete component classes');
  console.log('  - Easy to add new themes (e.g., HighContrastThemeFactory)');
  console.log('  - Client code works with interfaces, not concrete classes');
  console.log('  - Single point to switch entire product family');
}

main();

export {};
