import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import HomeScreen from './src/screens/Home';
import {StatusBar} from 'react-native';
import {PRIMARY} from './src/utils/theme';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

    <ApplicationProvider {...eva} theme={eva.dark}>
      <HomeScreen />
    </ApplicationProvider>
  </>
);
