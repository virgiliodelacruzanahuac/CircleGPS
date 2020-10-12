import React from "react";
import MapView, { Marker ,Circle} from "react-native-maps";

export default function Map({ position, markers,radioenkm }) {
  return (
    <MapView
      initialRegion={{
        latitude: position.latitude,
        longitude: position.longitude,
        longitudeDelta: 2,
        latitudeDelta: 2,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      minZoomLevel={8}
    >
    {
       <MapView.Circle
        center={{
          latitude: 19.4006,
          longitude: -99.264,
        }}
        radius={radioenkm*1000} // En 2000 metros
        strokeWidth={1}
        strokeColor="#00ff00"
        fillColor= 'rgba(0,128,0,0.3)'
      />
      }
      
      {markers.map((marker) => (
        <Marker
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.message}
        />
      ))}
    </MapView>
  );
}