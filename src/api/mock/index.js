import applyMock from './adapter';
import mockUser from './user';

function setupMock(handle) {
  const mock = applyMock(handle);
  mockUser(mock);

  mock.onAny().passThrough();
}

export default setupMock;

