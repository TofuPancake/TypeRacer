import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../AppContextProvider';

import GameTimer from '../GameTimer';

test('game timer renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <GameTimer />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});