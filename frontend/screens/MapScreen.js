// screens/MapScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    const fetchBusData = () => {
      axios.get('http://192.168.163.5:5000/api/buses/bus-status')
        .then(res => {
          const onlineBuses = res.data.filter(bus => bus.status !== 'offline');
          setBusData(onlineBuses);
        })
        .catch(err => console.log('Map fetch error:', err.message));
    };

    fetchBusData();
    const interval = setInterval(fetchBusData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getMarkerColor = (crowd) => {
    if (crowd <= 5) return 'green';
    if (crowd <= 15) return 'orange';
    return 'red';
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {busData.map((bus, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: bus.latitude,
              longitude: bus.longitude
            }}
            title={`Bus ${bus.busNo}`}
            description={`Passengers: ${bus.headCount}`}
          >
            <Ionicons
              name="bus"
              size={30}
              color={getMarkerColor(bus.headCount)}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
