import {
  ReactRegistry,
  Navigator,
  Garden,
  BarStyleDarkContent,
} from 'react-native-navigation-hybrid'
import App from './App'
import Translucent from './Translucent'
import Normal from './Normal'

Garden.setStyle({
  screenBackgroundColor: '#F8F8F8',
  navigationBarColorAndroid: '#FFFFFF',
  topBarStyle: BarStyleDarkContent,
})

ReactRegistry.startRegisterComponent()
ReactRegistry.registerComponent('App', () => App)
ReactRegistry.registerComponent('Translucent', () => Translucent)
ReactRegistry.registerComponent('Normal', () => Normal)
ReactRegistry.endRegisterComponent()

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
// 设置 UI 层级
Navigator.setRoot(deck)
