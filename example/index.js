import Navigation, { BarStyleDarkContent } from 'hybrid-navigation'
import App from './App'
import Translucent from './Translucent'
import Normal from './Normal'
import Modal from './Modal'

Navigation.setDefaultOptions({
  screenBackgroundColor: '#F8F8F8',
  navigationBarColorAndroid: '#FFFFFF',
  topBarStyle: BarStyleDarkContent,
})

Navigation.startRegisterComponent()
Navigation.registerComponent('App', () => App)
Navigation.registerComponent('Translucent', () => Translucent)
Navigation.registerComponent('Normal', () => Normal)
Navigation.registerComponent('Modal', () => Modal)
Navigation.endRegisterComponent()

const deck = {
  deck: {
    children: [
      {
        screen: { moduleName: 'App' },
      },
      {
        stack: {
          children: [{ screen: { moduleName: 'Translucent' } }],
        },
      },
    ],
  },
}

const drawer = {
  drawer: {
    children: [deck, { screen: { moduleName: 'App' } }],
  },
}

// 设置 UI 层级
Navigation.setRoot(drawer)
