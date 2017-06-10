import React, {Component, PropTypes} from 'react'
import {
    View,
    Image,
    Text,
    ListView,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import moment from 'moment'
import 'moment/locale/zh-cn'
import TopicItem from './TopicItem'
import ScrollableTabView from 'react-native-scrollable-tab-view'

moment.locale('zh-cn')

class UserContentComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {avatar_url, loginname, create_at, score} = this.props;
        return (
            <View style={styles.userContentContainer}>
                <View style={styles.userAvatarContainer}>
                    <Image
                        style={styles.userAvatar}
                        source={{uri: `${avatar_url}`}}
                    />
                    <View style={styles.userTextContainer}>
                        <Text style={styles.userName}>{loginname}</Text>
                        <Text style={styles.userBottomText}>
                            <Text style={styles.userTime}>创建于:{moment(create_at).locale('de').format('ll')}   </Text>
                            <Text style={styles.userScore}>积分:{score}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.topicItemContainer}>
                    <ScrollableTabView>
                        <TopicItem
                            tabLabel="最近创建"
                            data={this.props.recent_topics}
                        />
                        <TopicItem
                            tabLabel="最近回复"
                            data={this.props.recent_replies}
                        />
                        <TopicItem
                            tabLabel="收藏"
                            data={this.props.topic_collect}
                        />
                    </ScrollableTabView>
                </View>
            </View>
        )
    }
}

export default UserContentComponent

const styles = StyleSheet.create({
    userContentContainer: {
        flex: 1
    },
    userAvatarContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginBottom: 15
    },
    userTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userBottomText: {},
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10
    },
    userTime: {
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userScore: {
        fontSize: 12,
        marginRight: 20
    },
    topicItemContainer: {
        flex: 3,
    },
    buttonGroup: {
        height: 50,
        flexDirection: 'row'
    },
    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#666'
    },
    topicContainer: {
        flex: 1
    },
    selectedStyle: {
        borderBottomWidth: 4,
        borderBottomColor: '#387ef5'
    }
})

