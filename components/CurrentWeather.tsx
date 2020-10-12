import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { apiStates, useApi } from './useApi';
import { WeatherIcon } from './WeatherIcon';

export interface Props {
    city: string;
}

export const CurrentWeather: React.FC<Props> = (props) => {


    const { state, error, data } = useApi(props.city);

    switch (state) {
        case apiStates.ERROR:
            return <Text>ERROR: {error || 'General error'}</Text>;
        case apiStates.SUCCESS:

            return (
                <View style={styles.container}>
                    <WeatherIcon scale={2} icon={data.weather[0].icon} />
                    <Text style={[styles.bold, styles.small]} >{data.main.temp} °C</Text>
                    <Text style={styles.bold} >{data.name} </Text>
                </View>
            );
        default:
            return <Text>loading..</Text>;
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