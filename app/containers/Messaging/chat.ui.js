import React from 'react';
import * as signalR from '@aspnet/signalr'
import { connect } from "react-redux";
import {
    FlatList,
    View,
    Platform,
    Image,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { InteractionManager } from 'react-native';
import {
    RkButton,
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkStyleSheet,
    RkTheme
} from 'react-native-ui-kitten';
import _ from 'lodash';
import { FontAwesome } from '../../assets/icons';
import { Avatar } from '../../components/avatar';
import { scale } from '../../utils/scale';
let moment = require('moment');


const data = {
    messages: []
};

export class Chat extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let renderAvatar = (user) => {
            return (
                <TouchableOpacity >
                    <Avatar style={styles.avatar} rkType='small' img={require('../../assets/icons/logoApp.png')} />
                </TouchableOpacity>
            );
        };

        let renderTitle = (user) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('ProfileV1', { id: user.id })}>
                    <View style={styles.header}>
                        <RkText rkType='header5'>{`${user.firstName} ${user.lastName}`}</RkText>
                        <RkText rkType='secondary3 secondaryColor'>Online</RkText>
                    </View>
                </TouchableOpacity>
            )
        };

        let rightButton = renderAvatar(null);
        let title = renderTitle({ user: { id: 1, firstName: "Duy", lastName: "Tran" } });
        return (
            {
                headerTitle: title,
                headerRight: rightButton
            });
    };

    constructor(props) {
        super(props);
        this.state = {
            data: data
        };

        this.ID = "Intelligent2610";

        this.messageReceived = this._messageReceived.bind(this);

        let transportType = signalR.TransportType.WebSockets;
        let logger = new signalR.ConsoleLogger(signalR.LogLevel.Information);
        this.connection = new signalR.HubConnection('http://chat.demo.smileway.co/chat',
            { transport: transportType, logger: logger });

        this.connection.on('broadcastMessage', this.messageReceived);

        this.connection.start().then(() => console.log("this.connection.id")).catch(err => (console.log(`start`)));

    }

    componentWillUnmount() {
        this.connection.stop();
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.refs.list.scrollToOffset({x: 0, y: 0, animated: true});
        });
    }

    _keyExtractor(post, index) {
        return post.id;
    }

    _renderItem(info) {
        let inMessage = info.item.type === 'in';
        let backgroundColor = inMessage
            ? RkTheme.current.colors.chat.messageInBackground
            : RkTheme.current.colors.chat.messageOutBackground;
        let itemStyle = inMessage ? styles.itemIn : styles.itemOut;

        let renderDate = (date) => (
            <RkText style={styles.time} rkType='secondary7 hintColor'>
                {moment().add(date, 'seconds').format('LT')}
            </RkText>);

        return (
            <View style={[styles.item, itemStyle]}>
                {!inMessage && renderDate(info.item.date)}
                <View style={[styles.balloon, { backgroundColor }]}>
                    <RkText rkType='primary2 mediumLine chat'>{info.item.text}</RkText>
                </View>
                {inMessage && renderDate(info.item.date)}
            </View>
        )
    }

    _scroll() {
        if (Platform.OS === 'ios') {
            this.refs.list.scrollToOffset({x: 0, y: 0, animated: true});
        } else {
            _.delay(() => this.refs.list.scrollToOffset({x: 0, y: 0, animated: true}), 100);
        }
    }

    _messageReceived(name, message) {
        if (this.ID == name) {
            return;
        }
        let msg = {
            id: new Date().valueOf(),
            time: 0,
            type: 'in',
            text: message
        };


        let data = this.state.data;
        data.messages.unshift(msg);

        this.setState({
            data,
            message: ''
        });
        this._scroll(true);
    }

    _pushMessage() {
        if (!this.state.message)
            return;
        let msg = {
            id: new Date().valueOf(),
            time: 0,
            type: 'out',
            text: this.state.message
        };


        let data = this.state.data;
        data.messages.unshift(msg);

        this.setState({
            data,
            message: ''
        });
        this._scroll(true);

        this.connection.invoke('send', this.ID, this.state.message);
    }

    render() {
        return (
            <RkAvoidKeyboard style={styles.container} onResponderRelease={(event) => {
                Keyboard.dismiss();
            }}>
                <FlatList ref='list'
                    extraData={this.state}
                    style={styles.list}
                    data={this.state.data.messages}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
                <View style={styles.footer}>
                    <RkButton style={styles.plus} rkType='clear'>
                        <RkText rkType='awesome secondaryColor'>{FontAwesome.plus}</RkText>
                    </RkButton>

                    <RkTextInput
                        onFocus={() => this._scroll(true)}
                        onBlur={() => this._scroll(true)}
                        onChangeText={(message) => this.setState({ message })}
                        value={this.state.message}
                        rkType='row sticker'
                        placeholder="Add a comment..." />

                    <RkButton onPress={() => this._pushMessage()} style={styles.send} rkType='circle highlight'>
                        <Image source={require('../../assets/icons/sendIcon.png')} />
                    </RkButton>
                </View>
            </RkAvoidKeyboard>

        )
    }
}

let styles = RkStyleSheet.create(theme => ({
    header: {
        alignItems: 'center'
    },
    avatar: {
        marginRight: 16,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.screen.base
    },
    list: {
        paddingHorizontal: 17,
        transform: [{ scaleY: -1 }]
    },
    footer: {
        flexDirection: 'row',
        minHeight: 60,
        padding: 10,
        backgroundColor: theme.colors.screen.alter
    },
    item: {
        marginVertical: 14,
        transform: [{ scaleY: -1 }],
        flex: 1,
        flexDirection: 'row'
    },
    itemIn: {},
    itemOut: {
        alignSelf: 'flex-end'
    },
    balloon: {
        maxWidth: scale(250),
        padding: 15,
        borderRadius: 20,
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15
    },
    plus: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 7
    },
    send: {
        width: 40,
        height: 40,
        marginLeft: 10,
    }
}));

export default connect()(Chat);