import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../AppContextProvider';

import Help from '../Help';

test('help renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Help />
    </AppContextProvider>
);
  expect(snapshotComponent).toMatchSnapshot();
});