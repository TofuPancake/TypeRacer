import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../AppContextProvider';

import Header from '../Header';

test('header renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Header />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});