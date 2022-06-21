import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './Styles'
import { Navigator, useNavigator } from 'hybrid-navigation'

export default function Modal() {

  const navigator = useNavigator()

  async function printRouteGraph() {
    const graph = await Navigator.routeGraph()
    console.log(graph)
    const route = await Navigator.currentRoute()
    console.log(route)
  }

  return (<View style={ { flex: 1, alignItems: 'center', justifyContent: 'center'  } }>
  
  <View style={{ backgroundColor: '#FFFFFF', width: '80%', paddingVertical: 36,  }}>
    <Text style={styles.welcome}>这是一个 Modal</Text>

    <TouchableOpacity onPress={() => navigator.hideModal()} activeOpacity={0.2} style={styles.button}>
      <Text style={styles.buttonText}>hideModal</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={printRouteGraph} activeOpacity={0.2} style={styles.button}>
      <Text style={styles.buttonText}>printRouteGraph</Text>
    </TouchableOpacity>
    </View>
  </View>)

}