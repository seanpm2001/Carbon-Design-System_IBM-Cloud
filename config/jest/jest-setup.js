import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// import { getComputedStyle as mockGetComputedStyle } from '../../src/utils/testMocks/window';

// mockGetComputedStyle();

const toBeAccessible = require('./matchers/toBeAccessible');

jest.setTimeout(30000);

expect.extend({ toBeAccessible });
