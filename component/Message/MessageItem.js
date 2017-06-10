import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import ButtonView from '../../base/ButtonView'
import IconButton from '../../base/IconButton'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

class MessageItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {author, content, create_at,reply} = this.props;
        return (
            <ButtonView
                effect={ButtonView.EFFECT.DEFAULT}
                onPress={this._navigateTopicDetail}
            >
                <View style={styles.container}>
                    <View style={styles.detail}>
                        <IconButton
                            iconStyle={styles.avatar}
                            source={{uri: author.avatar_url}}
                            onPress={this._avatarImageOnPress}
                        />
                        <View style={styles.centerContent}>
                            <Text style={styles.detailText}>{author.loginname}</Text>
                            <Text style={styles.detailText}>{reply.content}</Text>
                        </View>
                        <View style={styles.rightContent}>
                            <Text style={styles.detailText}>
                                {moment(create_at).startOf('hour').fromNow()}
                            </Text>
                        </View>
                    </View>
                </View>
            </ButtonView>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'column',
        borderBottomWidth: 0.5,
        borderBottomColor: '#666',
        padding: 15
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

export default MessageItem