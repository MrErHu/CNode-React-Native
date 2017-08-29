import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {headerStyle, headerTitleStyle} from '../../constant/Constant'
import MessageHelper from './MessageHelper'
import MessageList from './MessageList'
import {night, light} from './style'

class Message extends Component {

    constructor(props) {
        super(props)
        this.helper = new MessageHelper();

    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '我的消息',
            headerStyle: headerStyle,
            headerTitleStyle: headerTitleStyle,

        }
    }

    static childContextTypes = {
        navigation: PropTypes.object,
        night: PropTypes.bool
    }

    getChildContext() {
        return {
            navigation: this.props.navigation,
            night: this.props.navigation.state.params.night
        }
    }

    componentWillMount() {
        this.helper.getData(this.props).then((data) => {
            this.setState({
                data: data
            })
        })
    }

    render() {
        const {params} = this.props.navigation.state;
        const styles = params.night ? night : light;
        return(
            <View style={styles.container}>
                {
                    !this.state ? (
                            <View style={styles.container}>
                                <Text style={styles.font}>Loading...</Text>
                            </View>
                        ) : (
                            <ScrollableTabView
                                tabBarTextStyle={{
                                    color: params.night ? '#FFF': '#000'
                                }}
                            >
                                <MessageList
                                    tabLabel="未读消息"
                                    data={this.state.data.hasnot_read_messages}
                                />
                                <MessageList
                                    tabLabel="已读消息"
                                    data={this.state.data.has_read_messages}
                                />
                            </ScrollableTabView>
                        )
                }
            </View>
        )
    }
}

export default Message