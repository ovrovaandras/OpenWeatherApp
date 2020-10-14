import React from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

import {endPoint,apiKey} from '../config/env.json';
import {objToQueryString} from './Helpers';

export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  };
  

export interface Props {
  city: string;
  untis?: string;
  
}

interface State {
    status: string;
}


export class Weather extends React.Component<Props, State> {

  page = null; 
  
  state: Readonly<State> = {
        status: apiStates.LOADING,
        response: null
  }

  constructor(props: Props) {
    super(props); 
  }

  buildQueryStrig = (queryParams :Object) =>
    endPoint+this.page+'?'+objToQueryString(
        {...queryParams,...{appid : apiKey}}
    );
  

  load = (queryParams :Object) =>{
    
    fetch(this.buildQueryStrig(queryParams))
      .then((response) => response.json())
      .then((response) => {   
          
        if(response.cod==200){
            this.setState({
                status: apiStates.SUCCESS,
                response : response
              });
        }else{
            this.setState({
                status: apiStates.ERROR,
                error: 'fetch failed'
              });           
        }
       
      })
      .catch(() => {
        this.setState({
            status: apiStates.ERROR,
            error: 'fetch failed'
          });
       
      });
  }

  
  getExclamationMarks = (numChars: number) =>
    Array(numChars + 1).join('!');

  _success = () => {
      return null;
  }
  _loading = () => {
    return (
        <View style={styles.root}>
           <ActivityIndicator />
      </View>
    );
  }
  _error = () => {
    return (
        <View style={styles.root}>
          <Text style={styles.text}>              
            {this.state.status}: {this.state.error} 
          </Text>        
      </View>
    );
  } 
  
  switchRender = () => {
    switch(this.state.status) {
        case apiStates.LOADING:
            return this._loading()
            break;
        case apiStates.SUCCESS:
            return this._success()
            break;
        case apiStates.ERROR:        
            return this._error();
            break;
      }
  }
  
  render() {
    return this.switchRender();
  }
}

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center'
  },  
  text: {
    color: '#999',
    fontWeight: 'bold'
  }
});