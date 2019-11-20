import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './Styles'

export default class Normal extends Component {
  static navigationItem = {
    titleItem: {
      title: 'Normal Page',
    },
  }

  constructor(props) {
    super(props)
    this.pushToTranslucent = this.pushToTranslucent.bind(this)
    this.pushToNormal = this.pushToNormal.bind(this)
    this.popToRoot = this.popToRoot.bind(this)
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>这是一个正常的页面</Text>
        <TouchableOpacity
          onPress={this.pushToTranslucent}
          activeOpacity={0.2}
          style={styles.button}>
          <Text style={styles.buttonText}>push 到一个透明的页面</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.pushToNormal} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>push 到一个正常的页面</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.popToRoot} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>back to home</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
