// ❌ BAD: No Strategy - One giant class with a switch on transport type

type TransportType = 'driving' | 'walking' | 'biking';

class NavigationApp {
  // Every new transport mode forces us to edit this method
  public buildRoute(type: TransportType, start: string, end: string): string[] {
    switch (type) {
      case 'driving':
        return [
          `Start at ${start}`,
          'Take the highway entrance',
          'Follow the fastest motorway',
          'Take the nearest exit',
          `Arrive at ${end}`,
        ];
      case 'walking':
        return [
          `Start at ${start}`,
          'Use pedestrian sidewalks',
          'Cut through the city park',
          'Cross at the traffic light',
          `Arrive at ${end}`,
        ];
      case 'biking':
        return [
          `Start at ${start}`,
          'Enter the dedicated bike lane',
          'Follow the riverside path',
          'Rejoin the road at the bridge',
          `Arrive at ${end}`,
        ];
      default:
        throw new Error(`Unknown transport type: ${type}`);
    }
  }

  public navigate(type: TransportType, start: string, end: string): void {
    const steps = this.buildRoute(type, start, end);
    steps.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`);
    });
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Anti-Example: Navigation App With Switch ===\n');

  const app = new NavigationApp();

  console.log('Driving route:');
  app.navigate('driving', 'Home', 'Office');

  console.log('');
  console.log('Walking route:');
  app.navigate('walking', 'Home', 'Office');

  console.log('');
  console.log('Biking route:');
  app.navigate('biking', 'Home', 'Office');

  console.log('\n Problems with this approach:');
  console.log('  - Adding a new transport mode requires modifying NavigationApp (violates Open/Closed)');
  console.log('  - All routing algorithms live in one class (violates Single Responsibility)');
  console.log('  - The switch grows unbounded as new modes are added');
  console.log('  - Algorithms cannot be swapped or reused independently');
  console.log('  - Testing one algorithm means dragging the whole class along');
}

main();

export {};
