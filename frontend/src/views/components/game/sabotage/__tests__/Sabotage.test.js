import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../AppContextProvider';

import Sabotage from '../Sabotage';

test('sabotage renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Sabotage />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});