import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../AppContextProvider';

import PlayerList from '../PlayersList';

test('player list renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <PlayerList />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});