let mock = null;

function applyMock(handle) {
  if (process.env.NODE_ENV === 'development') {
    const MockAdapter = require('axios-mock-adapter'); // eslint-disable-line
    mock = new MockAdapter(handle);
  }
  return mock;
}

export function getMock() {
  return mock;
}

export default applyMock;
