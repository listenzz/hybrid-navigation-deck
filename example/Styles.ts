import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 16,
  },

  transparent: {
    position: 'absolute',
    bottom: 128,
    left: 32,
    right: 32,
    height: 240,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },

  buttonText: {
    backgroundColor: 'transparent',
    color: 'rgb(34,88,220)',
  },

  buttonTextYellow: {
    backgroundColor: 'transparent',
    color: 'yellow',
  },

  welcome: {
    backgroundColor: 'transparent',
    fontSize: 17,
    textAlign: 'center',
    margin: 8,
  },

  welcomeRed: {
    backgroundColor: 'transparent',
    fontSize: 17,
    color: 'red',
    textAlign: 'center',
    margin: 8,
  },

  input: {
    height: 40,
    margin: 16,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
  },

  keyboard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F8F8F8',
  },
})
