import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../AppContextProvider';

import TextArena from '../TextArena';

test('text arena renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <TextArena />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});