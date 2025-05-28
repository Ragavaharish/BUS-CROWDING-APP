import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const submitFeedback = () => {
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setFeedback('');
  };

  const handleStarPress = (value) => {
    setRating(value);
    Alert.alert('Thank you!', `You rated us ${value} star(s).`);
    setTimeout(() => setRating(0), 1000); // Reset rating after 1 sec
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.label}>🌙 Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🌐 Language</Text>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => setLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Hindi" value="Hindi" />
          <Picker.Item label="Tamil" value="Tamil" />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>⭐ Rate Us</Text>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity key={value} onPress={() => handleStarPress(value)}>
              <Ionicons
                name={value <= rating ? 'star' : 'star-outline'}
                size={32}
                color="#FFD700"
                style={{ marginHorizontal: 4 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>📝 Feedback</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your feedback"
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity style={styles.button} onPress={submitFeedback}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>ℹ️ About App</Text>
        <Text style={styles.note}>
          This app shows real-time crowd detection on buses using AI and camera vision.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  value: {
    fontSize: 15,
    color: '#444',
  },
  note: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  picker: {
    backgroundColor: '#EEE',
    borderRadius: 8,
    marginTop: 8,
  },
});
