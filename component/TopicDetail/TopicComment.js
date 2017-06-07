import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import moment from 'moment'
import IconButton from '../../base/IconButton'
import {MarkdownView} from 'react-native-markdown-view'

const TopicComment = (props) => {
    const {author, create_at, content} = props;

    return (
        <View style={styles.commentContainer}>
            <View style={styles.avatarView}>
                <Image
                    style={styles.avatar}
                    source={{uri: `${author.avatar_url}`}}
                />
            </View>
            <View style={styles.rightView}>
                <View style={styles.rightTopContainer}>
                    <View>
                        <View style={styles.rightTopView}>
                            <Text style={styles.nameText}>{author.loginname}</Text>
                        </View>
                        <View>
                            <Text style={styles.timeText}>{moment(create_at).format('YYYY-M-D H:k')}</Text>
                        </View>
                    </View>
                    <View style={styles.operations}>
                        <View style={styles.praiseContainer}>
                            <IconButton
                                name="praise"
                            />
                            <Text style={[styles.timeText,{marginLeft: 5}]}>10</Text>
                        </View>
                        <IconButton
                            name='comment'
                            style={{marginLeft: 5}}
                        />
                    </View>
                </View>
                <View >
                    <MarkdownView>{content}</MarkdownView>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    avatarView: {
        width: 40,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginTop: 5
    },
    rightView: {
        flex: 1,
        marginTop: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#666'
    },
    nameText: {
        fontSize: 13
    },
    rightTopView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timeText: {
        fontSize: 11,
        color: '#666'
    },
    contentText: {
        fontSize: 14
    },
    operations: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightTopContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    praiseContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',

    }
})

export default TopicComment