import React from 'react';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import { withRkTheme } from 'react-native-ui-kitten';
import { RootRoutes } from './app/config/routes'
import logger from "redux-logger";
import { bootstrap } from './app/config/bootstrap';
import { Provider } from "react-redux";
import configureStore from './app/store/configureStore';
import AppWithNavigationState from './app/containers/AppNavigator';

bootstrap();

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}


//let SideMenu = withRkTheme(Screens.SideMenu);
// const KittenApp = StackNavigator({
//   Splash: {
//     screen: SplashScreen,
//   }, ...RootRoutes
// },
// {
//     headerMode: 'none',
//   }
// );

class ReduxExampleApp extends React.Component {
  store = configureStore({});

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}


export default ReduxExampleApp;

