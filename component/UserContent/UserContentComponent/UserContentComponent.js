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
import {night, light} from './style'

moment.locale('zh-cn')

class UserContentComponent extends Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        setting: PropTypes.object
    }

    render() {
        const {avatar_url, loginname, create_at, score} = this.props;
        const styles = this.context.setting.night ? night : light;
        return (
            <View style={styles.userContentContainer}>
                <View style={styles.userAvatarContainer}>
                    <Image
                        style={styles.userAvatar}
                        source={{uri: `${avatar_url}`}}
                    />
                    <View style={styles.userTextContainer}>
                        <Text style={[styles.userName,styles.font]}>{loginname}</Text>
                        <Text style={styles.userBottomText}>
                            <Text style={[styles.userTime,styles.font]}>创建于:{moment(create_at).locale('de').format('ll')}   </Text>
                            <Text style={[styles.userScore,styles.font]}>积分:{score}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.topicItemContainer}>
                    <ScrollableTabView
                        tabBarTextStyle={{
                            color: this.context.setting.night ? '#FFF': '#000'
                        }}
                    >
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
