import '@testing-library/jest-dom';
import { server } from './src/db/mocks/server';

// Start the mock server
if (typeof window === 'undefined' && process.env.JEST_WORKER_ID !== undefined) {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}