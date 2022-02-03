import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../AppContextProvider';

import PlayerTextArena from '../PlayerTextArena';

test('player text arena renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <PlayerTextArena />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});