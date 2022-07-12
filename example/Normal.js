import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './Styles'
import { Navigator } from 'hybrid-navigation'

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
    this.redirectToTranslucent = this.redirectToTranslucent.bind(this)
    this.popToRoot = this.popToRoot.bind(this)
    this.printRouteGraph = this.printRouteGraph.bind(this)
    this.present = this.present.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.showModal = this.showModal.bind(this)
  }

  pushToTranslucent() {
    this.props.navigator.push('Translucent')
  }

  pushToNormal() {
    this.props.navigator.push('Normal')
  }

  redirectToTranslucent() {
    this.props.navigator.redirectTo('Translucent')
  }

  popToRoot() {
    this.props.navigator.popToRoot()
  }

  present() {
    this.props.navigator.present('Normal')
  }

  dismiss() {
    this.props.navigator.dismiss()
  }

  showModal() {
    this.props.navigator.showModal('Modal')
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
        <Text style={styles.welcome}>这是一个正常的页面</Text>
        <TouchableOpacity onPress={this.pushToTranslucent} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>push 到一个透明的页面</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.pushToNormal} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>push 到一个正常的页面</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.redirectToTranslucent} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>redirect 到一个透明的页面</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.popToRoot} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>back to home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.present} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>present</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.dismiss} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>dismiss</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.showModal} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>showModal</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.printRouteGraph} activeOpacity={0.2} style={styles.button}>
          <Text style={styles.buttonText}>printRouteGraph</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
