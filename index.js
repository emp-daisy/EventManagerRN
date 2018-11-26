import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import store from './src/reducers/indexReducer';
import Application from './src/components/Application';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Application/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
