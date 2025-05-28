import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BusDetailsScreen({ route }) {
  const { bus } = route.params;

  const formatTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus {bus.busNo}</Text>
      <Text style={styles.info}>👥 Passengers: {bus.headCount}</Text>
      <Text style={styles.info}>🗺 Location: {bus.latitude}, {bus.longitude}</Text>
      <Text style={styles.info}>🕒 Last Updated: {formatTime(bus.updatedAt)}</Text>
      <Text style={styles.info}>📍 Status: {bus.status}</Text>
      {bus.destination && <Text style={styles.info}>🛣 Destination: {bus.destination}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F7F7F7', flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
});
