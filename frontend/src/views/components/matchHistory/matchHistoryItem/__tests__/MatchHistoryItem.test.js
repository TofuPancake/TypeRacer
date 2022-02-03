import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../AppContextProvider';

import MatchHistoryItem from '../MatchHistoryItem';

test('match history item renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <MatchHistoryItem />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});