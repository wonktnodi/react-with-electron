import applyMock from './adapter';
import mockUser from './user';
import mockList from './tableData';

function setupMock(handle) {
  const mock = applyMock(handle);
  mockUser(mock);
  mockList(mock);

  mock.onAny().passThrough();
}

export default setupMock;

