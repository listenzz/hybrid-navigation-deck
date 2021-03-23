import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './Styles'
import { Navigator } from 'hybrid-navigation'
export default class Translucent extends Component {
  static navigationItem = {
    titleItem: {
      title: 'Translucent Page',
    },
    screenBackgroundColor: '#00000000',
    passThroughTouches: true,
    navigationBarColorAndroid: '#FFFFFF',
  }

  constructor(props) {
    super(props)
    this.pushToTranslucent = this.pushToTranslucent.bind(this)
    this.pushToNormal = this.pushToNormal.bind(this)
    this.popToRoot = this.popToRoot.bind(this)
    this.printRouteGraph = this.printRouteGraph.bind(this)
  }

  pushToTranslucent() {
    this.props.navigator.push('Translucent')
  }

  pushToNormal() {
    this.props.navigator.push('Normal')
  }

  popToRoot() {
    this.props.navigator.popToRoot()
  }

  async printRouteGraph() {
    const graph = await Navigator.routeGraph()
    console.log(graph)
    const route = await Navigator.currentRoute()
    console.log(route)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.transparent}>
          <Text style={styles.welcomeRed}>这是一个透明的页面.</Text>
          <TouchableOpacity onPress={this.pushToTranslucent} activeOpacity={0.2} style={styles.button}>
            <Text style={styles.buttonTextYellow}>push 到一个透明的页面</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.pushToNormal} activeOpacity={0.2} style={styles.button}>
            <Text style={styles.buttonTextYellow}>push 到一个正常的页面</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.popToRoot} activeOpacity={0.2} style={styles.button}>
            <Text style={styles.buttonTextYellow}>back to home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.printRouteGraph} activeOpacity={0.2} style={styles.button}>
            <Text style={styles.buttonTextYellow}>printRouteGraph</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
