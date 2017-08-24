import React, {Component, PropTypes} from 'react'
import {decorate as mixin} from 'react-mixin'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    View,
    Text,
    Image,
} from 'react-native'

import {TabContrast} from '../../../constant/Constant'
import ButtonView from '../../../base/ButtonView'
import IconButton from '../../../base/IconButton'
import {night,light} from './style'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

@mixin(PureRenderMixin)
class TopicListItem extends Component {

    constructor(props, context) {
        super(props, context)
        this._avatarImageOnPress = this._avatarImageOnPress.bind(this)
        this._navigateTopicDetail = this._navigateTopicDetail.bind(this)
    }

    static contextTypes = {
        navigation: PropTypes.object,
    }

    render() {
        const {title, create_at, last_reply_at, tab, author, reply_count, visit_count} = this.props;
        const styles = this.props.night ? night : light;
        return (
            <ButtonView
                effect={ButtonView.EFFECT.DEFAULT}
                onPress={this._navigateTopicDetail}
            >
                <View style={styles.container}>
                    <View style={styles.title}>
                        <View style={styles.tabView}>
                            <Text style={styles.tabText}>{TabContrast[tab]}</Text>
                        </View>
                        <Text
                            style={styles.titleContent}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    </View>
                    <View style={styles.detail}>
                        <IconButton
                            iconStyle={styles.avatar}
                            source={{uri: author.avatar_url}}
                            onPress={this._avatarImageOnPress}
                        />
                        <View style={styles.centerContent}>
                            <Text style={styles.detailText}>{author.loginname}</Text>
                            <Text
                                style={styles.detailText}>{'创建于: ' + moment(create_at).locale('de').format('ll')}</Text>
                        </View>
                        <View style={styles.rightContent}>
                            <Text
                                style={styles.detailText}
                                numberOfLines={1}
                            >
                                <Text style={{color: '#80bd01'}}>{reply_count}</Text>{` / ${visit_count}`}
                            </Text>
                            <Text style={styles.detailText}>
                                {moment(last_reply_at).startOf('hour').fromNow()}
                            </Text>
                        </View>
                    </View>
                </View>
            </ButtonView>
        );
    }

    _avatarImageOnPress() {
        const {navigation} = this.context
        const {author} = this.props
        navigation.navigate('UserContent', {
            title: `${author.loginname}的主页`,
            userName: author.loginname
        })
    }

    _navigateTopicDetail() {
        const {navigation} = this.context
        const {id} = this.props
        navigation.navigate('TopicDetail', {
            title: '正文',
            topicId: id
        })
    }
}

export default TopicListItem