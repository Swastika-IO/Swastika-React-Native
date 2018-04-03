import React from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { Avatar } from '../../components';
import { HOST } from '../../config/APIConfig';
import { SocialBar } from '../../components';
let moment = require('moment');


export class ArticleDetails extends React.Component {
  static navigationOptions = {
    title: 'Article View'.toUpperCase()
  };

  constructor(props) {
    super(props);
    let { params } = this.props.navigation.state;
    this.articleInfo = params.dataArticle;
  }

  converImageURL(image) {
    return HOST + image
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image rkCardImg source={{
            uri: this.converImageURL(this.articleInfo.image),
            cache: 'only-if-cached',
          }} />
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.articleInfo.title}</RkText>
              <RkText rkType='secondary2 hintColor'>{moment().utc(this.articleInfo.createdDateTime).fromNow()}</RkText>
            </View>
            <TouchableOpacity >
              <Avatar rkType='circle' img={{
                uri: this.converImageURL(this.articleInfo.thumbnail),
                cache: 'only-if-cached',
              }} />
            </TouchableOpacity>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='primary3 bigLine'>{this.articleInfo.excerpt}</RkText>
            </View>
          </View>
          <View rkCardFooter>
            <SocialBar />
          </View>
        </RkCard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));

export default connect() (ArticleDetails);