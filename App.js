
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
// You can import from local files
import Map from './Map';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';

export default function App() 
{
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [Km, setKm] = useState(null);

  const getPosition = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setPosition(coords);
      setMarkers([
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
          message: "Estás aquí",
        },
      {
        latitude: 19.4006,
        longitude: -99.264,
        message: "Anahuac Norte",
      }
    ]);
  } catch (error) {
      console.log("getPosition -> error", error);
      setPosition(null);
    }
  };
  const entryPoint = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        getPosition();
      }
    } catch (error) {
      console.log("getPermissionAndPosition -> error", error);
    }
  };
  useEffect(() => {
    entryPoint();
  }, []);

  /* fin obtiene coordenadas */
  return (
    <View style={styles.container}>
      
      {(position && (
        <Card style={styles.mycard}>
        <Text>
       Circulo Mi posición en GPS{"\n"}
       A 
       <Picker
        selectedValue={Km}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) =>
          setKm(itemValue)
  }>
  <Picker.Item label="2" value="2" />
  <Picker.Item label="4" value="4" />
  <Picker.Item label="6" value="6" />
  <Picker.Item label="8" value="8" />
  <Picker.Item label="10" value="10" />
  <Picker.Item label="15" value="15" />
  <Picker.Item label="20" value="20" />
  <Picker.Item label="25" value="25" />
  
</Picker>
       
        km de la Universidad
        </Text>
        <Text>
        Latitud={position.latitude} {"\n"}
          Longitud={position.longitude}{"\n"}
        </Text>

        
          <Map position={position} markers={markers} radioenkm={Km} />
       </Card>
      )) || (
        <Card>
          <Text>GPS No disponible</Text>
        </Card>
      )}
      
    </View>
  );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 25,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mycard:
  {
    width: "100%",
    height: "80%",
  }
});
