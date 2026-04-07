import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'

export default function App() {
  return (

        <ScrollView contentInsetAdjustmentBehavior="never" style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.title}>Hybrid Navigation Deck</Text>
            <Text style={styles.description}>Demo app is running on React Native 0.84.1</Text>
            {global.HermesInternal == null ? null : <Text style={styles.engine}>Engine: Hermes</Text>}
            <Text style={styles.title}>Hybrid Navigation Deck</Text>
            <Text style={styles.description}>Demo app is running on React Native 0.84.1</Text>
            {global.HermesInternal == null ? null : <Text style={styles.engine}>Engine: Hermes</Text>}
            <Text style={styles.title}>Hybrid Navigation Deck</Text>
            <Text style={styles.description}>Demo app is running on React Native 0.84.1</Text>
            {global.HermesInternal == null ? null : <Text style={styles.engine}>Engine: Hermes</Text>}
            <Text style={styles.title}>Hybrid Navigation Deck</Text>
            <Text style={styles.description}>Demo app is running on React Native 0.84.1</Text>
            {global.HermesInternal == null ? null : <Text style={styles.engine}>Engine: Hermes</Text>}
            <Text style={styles.title}>Hybrid Navigation Deck</Text>
            <Text style={styles.description}>Demo app is running on React Native 0.84.1</Text>
            {global.HermesInternal == null ? null : <Text style={styles.engine}>Engine: Hermes</Text>}
            <Text style={styles.title}>Hybrid Navigation Deck</Text>
            <Text style={styles.description}>Demo app is running on React Native 0.84.1</Text>
            {global.HermesInternal == null ? null : <Text style={styles.engine}>Engine: Hermes</Text>}
            <Text style={styles.title}>Hybrid Navigation Deck</Text>
            <Text style={styles.description}>Demo app is running on React Native 0.84.1</Text>
            {global.HermesInternal == null ? null : <Text style={styles.engine}>Engine: Hermes</Text>}
            <Text style={styles.title}>Hybrid Navigation Deck</Text>
            <Text style={styles.description}>Demo app is running on React Native 0.84.1</Text>
            {global.HermesInternal == null ? null : <Text style={styles.engine}>Engine: Hermes</Text>}
          </View>
        </ScrollView>

  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 0,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '400',
    color: '#374151',
  },
  engine: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
})
