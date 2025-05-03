import '@testing-library/jest-dom';

declare global {
  interface CustomMatchers<R = unknown> {
    toBeInTheDocument(): R;
  }
}

export {}; 