import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../AppContextProvider';

import Game from '../Game';

test('game renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Game />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});