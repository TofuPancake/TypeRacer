import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../AppContextProvider';

import Lobby from '../Lobby';

test('lobby renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Lobby />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});