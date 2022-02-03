import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../AppContextProvider';

import PlayerArena from '../PlayerArena';

test('player arena renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <PlayerArena />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});