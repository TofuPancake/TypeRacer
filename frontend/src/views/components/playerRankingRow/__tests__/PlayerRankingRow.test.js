import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../AppContextProvider';

import PlayerRankingRow from '../PlayerRankingRow';

test('player ranking row renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <PlayerRankingRow />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});