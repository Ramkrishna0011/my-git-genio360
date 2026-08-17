import '@testing-library/jest-dom';

// jsdom doesn't implement scrollTo; @tanstack/react-router's scroll restoration calls it
// on every route load and jsdom logs a noisy "not implemented" error otherwise.
window.scrollTo = () => {};
