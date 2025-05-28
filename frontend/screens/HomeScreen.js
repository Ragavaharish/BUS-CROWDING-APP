import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image
} from 'react-native';
import axios from 'axios';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    const fetchBuses = () => {
      axios.get('http://192.168.163.5:5000/api/buses/bus-status')
        .then((res) => {
          const filtered = res.data.filter(bus => bus.status !== 'offline');
          setBusData(filtered);
          setLoading(false);
        })
        .catch((err) => {
          console.error('❌ Error fetching buses:', err.message);
          setLoading(false);
        });
    };

    fetchBuses();
    const interval = setInterval(fetchBuses, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderBus = ({ item }) => (
    <View style={styles.busCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialIcons name="directions-bus" size={24} color="#555" />
        <Text style={styles.busNo}>{item.busNo}</Text>
        <Text style={styles.busRoute}>To {item.destination || 'Unknown'}</Text>
      </View>
      <Text style={styles.subDetail}>👥 {item.headCount} passengers</Text>
      <Text style={styles.subDetail}>🕒 ETA: {simulateETA(item.headCount)}</Text>
    </View>
  );

  const simulateETA = (headCount) => {
    if (headCount <= 5) return "2 min";
    if (headCount <= 15) return "4 min";
    return "6 min";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>BUSIFY</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput placeholder="Find and track your bus" style={styles.searchInput} />
      </View>


      <Text style={styles.sectionLabel}>Nearest buses</Text>
      <FlatList
        data={busData}
        keyExtractor={(item) => item._id}
        renderItem={renderBus}
        refreshing={loading}
        onRefresh={() => {}}
      />

      <Text style={styles.sectionLabel}>Search bus</Text>
      <View style={styles.searchBox}>
        <TextInput placeholder="From" style={styles.input} value={from} onChangeText={setFrom} />
        <TextInput placeholder="To" style={styles.input} value={to} onChangeText={setTo} />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8FF' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  logo: { width: 30, height: 30, resizeMode: 'contain', marginRight: 8 },
  title: { fontSize: 24, fontWeight: 'bold' },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: { marginLeft: 10, fontSize: 16, flex: 1 },

  stopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  stopName: { fontSize: 18, fontWeight: '600' },
  badge: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: { fontSize: 12, color: '#000' },

  sectionLabel: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },

  busCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  busNo: { fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
  busRoute: { marginLeft: 8, color: '#555' },
  subDetail: { marginTop: 5, color: '#666' },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 8,
  },
});
