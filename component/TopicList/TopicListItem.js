import React, {Component, PropTypes} from 'react'
import {decorate as mixin} from 'react-mixin'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {TabContrast} from '../../constant/Constant'
import ButtonView from '../../base/ButtonView'
moment.locale('zh-cn')

@mixin(PureRenderMixin)
class TopicListItem extends Component {

    constructor(props, context) {
        super(props, context)
        this._avatarImageOnPress = this._avatarImageOnPress.bind(this)
        this._navigateTopicDetail =this._navigateTopicDetail.bind(this)
    }

    static contextTypes = {
        navigation: PropTypes.object
    }

    render() {
        const {
            title, create_at, last_reply_at, tab, author, reply_count, visit_count
        } = this.props;

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
                        <TouchableWithoutFeedback
                            onPress={this._avatarImageOnPress}
                        >
                            <Image
                                style={styles.avatar}
                                source={{uri: author.avatar_url}}
                            />
                        </TouchableWithoutFeedback>
                        <View style={styles.centerContent}>
                            <Text style={styles.detailText}>{author.loginname}</Text>
                            <Text
                                style={styles.detailText}>{'创建于: ' + moment(create_at).locale('de').format('ll')}</Text>
                        </View>
                        <View style={styles.rightContent}>
                            <Text style={styles.detailText}>
                                <Text style={{color: '#80bd01'}}>{reply_count}</Text>
                                {` / ${visit_count}`}
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

    _navigateTopicDetail(){
        const {navigation} = this.context
        const {id} = this.props
        navigation.navigate('TopicDetail',{
            title: '正文',
            topicId: id
        })
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'column',
        borderBottomWidth: 0.5,
        borderBottomColor: '#666',
        padding: 15
    },
    title: {
        height: 20,
        flexDirection: 'row',
        marginBottom: 10
    },
    tabView: {
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#80bd01'
    },
    tabText: {
        color: '#FFF'
    },
    titleContent: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    detail: {
        flex: 1,
        flexDirection: 'row'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    centerContent: {
        flex: 1,
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    rightContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: 70
    },
    detailText: {
        fontSize: 13,
        fontFamily: 'Helvetica',
        color: '#888'
    }

})

export default TopicListItem