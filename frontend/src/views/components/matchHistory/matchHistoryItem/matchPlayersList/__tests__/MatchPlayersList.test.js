import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../../AppContextProvider';

import MatchPlayersList from '../MatchPlayersList';

test('match players list renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <MatchPlayersList />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});