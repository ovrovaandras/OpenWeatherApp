import React from 'react';

import {
  SafeAreaView,  
  StatusBar,
} from 'react-native';

import { CurrentWeather } from './components/CurrentWeather';

const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>         
        <CurrentWeather 
          city={'Budapest'} 
          untis={'metric'}
        />                    
      </SafeAreaView>
    </>
  );
};

export default App;
