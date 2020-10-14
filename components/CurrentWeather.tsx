import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { WeatherIcon } from './WeatherIcon';
import { Weather } from './Weather';

export interface Props {
    city: string;
    untis?: string;
    
}


export class CurrentWeather extends Weather <Props, State> {

    page = 'weather';
    
    componentDidMount() {
        this.load({
            q     : this.props.city,
            units : this.props.untis??'imperial'
        });
    } 

    _success = () => {
        const { response } = this.state;
        return ( 
                <View style={styles.container}>
                    <WeatherIcon scale={2} icon={response.weather[0].icon} />
                    <Text style={[styles.bold, styles.small]} >{response.main.temp} 
                    {this.props.untis ==  'metric' ? '°C' : '°K'}</Text>
                    <Text style={styles.bold} >{response.name} </Text>
                </View>
        )
    }
}


// styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    bold: {
        color: '#999',
        fontWeight: 'bold',
        fontSize: 30
    },
    small: {

        fontSize: 20
    },
});