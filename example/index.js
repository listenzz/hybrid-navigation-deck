import { ReactRegistry, Navigator, Garden, BarStyleDarkContent } from 'hybrid-navigation'
import App from './App'
import Translucent from './Translucent'
import Normal from './Normal'
import Modal from './Modal'

Garden.setStyle({
  screenBackgroundColor: '#F8F8F8',
  navigationBarColorAndroid: '#FFFFFF',
  topBarStyle: BarStyleDarkContent,
})

ReactRegistry.startRegisterComponent()
ReactRegistry.registerComponent('App', () => App)
ReactRegistry.registerComponent('Translucent', () => Translucent)
ReactRegistry.registerComponent('Normal', () => Normal)
ReactRegistry.registerComponent('Modal', () => Modal)
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
