import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../AppContextProvider';

import Home from '../Home';

test('home renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Home/>
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});