import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppContextProvider } from '../../../../../AppContextProvider';

import ProfileCard from '../ProfileCard';

test('profile card renders correctly', () => {
  const shallowRenderer = new ShallowRenderer();
  const snapshotComponent = shallowRenderer.render(
    <AppContextProvider>
      <ProfileCard />
    </AppContextProvider>);
  expect(snapshotComponent).toMatchSnapshot();
});