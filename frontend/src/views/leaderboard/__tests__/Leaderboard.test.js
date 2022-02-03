import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../AppContextProvider';

import Leaderboard from '../Leaderboard';

test('leaderboard renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Leaderboard />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});