
import React from 'react';
import { Image } from 'react-native';


export interface Props {
    icon: string;
    scale?: number;
}

const url = 'http://openweathermap.org/img/wn/';

const generateLink = (icon,scale) =>{
    
    if(scale>1 && scale<4)
        return  url+icon+'@'+scale+'x.png';
        
    return  url+icon+'.png';
        
}

export const WeatherIcon: React.FC<Props> = (props) => {
 
   return <Image 
            style={{width: 50*props.scale, height: 50*props.scale}}
            source={{uri: generateLink(props.icon,props.scale)}}
        />
}

 
