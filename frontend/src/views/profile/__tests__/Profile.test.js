import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../AppContextProvider';

import Profile from '../Profile';

test('profile renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Profile />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});