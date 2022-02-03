import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../AppContextProvider';

import Countdown from '../Countdown';

test('countdown renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <Countdown />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});