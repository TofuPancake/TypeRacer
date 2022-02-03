import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../AppContextProvider';

import EndScreen from '../EndScreen';

test('end screen renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <EndScreen />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});