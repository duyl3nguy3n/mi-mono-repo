import 'jest-preset-angular/setup-jest';

// Polyfill to fix unit tests compilation errors when a component use DragEvent type
Object.defineProperty(window, 'DragEvent', {
  value: class DragEvent {},
});

// Polyfill to fix unit tests compilation errors when a component use ResizeObserver type
Object.defineProperty(window, 'ResizeObserver', {
  value: class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
});
