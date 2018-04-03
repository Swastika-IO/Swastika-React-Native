import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import RootRoutes from '../config/routes';

const paramsToProps = (SomeComponent) => {
  // turns this.props.navigation.state.params into this.params.<x>
  return class extends React.Component {
    render() {
      const { navigation, ...otherProps } = this.props
      const { state: { params } } = navigation
      return <SomeComponent {...this.props} {...params} />
    }
  }
}


export const AppNavigator = StackNavigator({
  Login: { screen: paramsToProps(RootRoutes.Login.screen) },
  Splash: { screen: paramsToProps(RootRoutes.Splash.screen) },
  Home: { screen: paramsToProps(RootRoutes.Home.screen) },
  MyModules: { screen: paramsToProps(RootRoutes.MyModules.screen) },
  MyChat: { screen: paramsToProps(RootRoutes.MyChat.screen) },
  ArticleDetail: { screen: paramsToProps(RootRoutes.ArticleDetail.screen) }
}, {
    // headerMode: 'none',
  });

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
