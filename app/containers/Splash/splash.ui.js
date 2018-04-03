import React from 'react';
import { parentBorder } from '../../utils/scale'
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar
} from 'react-native';
import {
  RkText,
  RkTheme
} from 'react-native-ui-kitten'
import { ProgressBar } from '../../components';
import { connect } from "react-redux";
import {
  KittenTheme
} from '../../config/theme';
import RootRoutes from '../../config/routes'
import { NavigationActions } from 'react-navigation';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';

let timeFrame = 500;

export class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    }
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'none');
    RkTheme.setTheme(KittenTheme);
    this.timer = setInterval(() => {
      if (this.state.progress == 1) {
        clearInterval(this.timer);
        setTimeout(() => {
          StatusBar.setHidden(false, 'slide');
          let toHome = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: RootRoutes.Home.name })]
          });
          this.props.navigation.dispatch(toHome)
        }, timeFrame);
      } else {
        let random = Math.random() * 0.5;
        let progress = this.state.progress + random;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }
    }, timeFrame)

  }

  render() {
    let width = Dimensions.get('window').width;
    return (
      <View style={styles.containerParent}>
        <View style={styles.container} flexDirection={'column'}>
          <View style={styles.text}>
            <RkText rkType='logo' style={styles.appName} >Swastika</RkText>
            <RkText rkType='light' style={styles.hero}>Smileway</RkText>
          </View>
          <ProgressBar
            color={RkTheme.current.colors.accent}
            style={styles.progress}
            progress={this.state.progress} width={scale(320)} />
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  containerParent: {
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    flex: 1
  },
  container: {
    backgroundColor: KittenTheme.colors.screen.base,
    justifyContent: 'space-between',
    flex: 1
  },
  imageEdge: {
    resizeMode: 'cover',
    height: scaleVertical(15),
  },
  image: {
    resizeMode: 'cover',
    height: scaleVertical(430),
  },
  text: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hero: {
    marginTop: 10,
    fontSize: 15,
    color: '#9a9d9f'
  },
  appName: {
    fontSize: 37,
    color: '#606060'
  },
  progress: {
    alignSelf: 'center',
    marginBottom: 35,
    backgroundColor: '#e5e5e5'
  }
});

export default connect()(SplashScreen);