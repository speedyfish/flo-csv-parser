import "@testing-library/jest-dom";

// Mock clipboard for copy tests
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});
