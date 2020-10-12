import React from 'react';

import {
  SafeAreaView,
  ScrollView, 
  StatusBar,
} from 'react-native';

import { CurrentWeather } from './components/CurrentWeather';





const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          >
            <CurrentWeather city={'Budapest'}></CurrentWeather>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
