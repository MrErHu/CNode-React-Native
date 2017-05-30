import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import moment from 'moment'
import Markdown from 'react-native-simple-markdown'

const TopicComment = (props)=>{
    const {author,create_at,content} = props;


    return (
        <View style={styles.commentContainer}>
            <View style={styles.avatarView}>
                <Image
                    style={styles.avatar}
                    source={{uri: `${author.avatar_url}`}}
                />
            </View>
            <View style={styles.rightView}>
                <View style={styles.rightTopView}>
                    <Text style={styles.nameText}>{author.loginname}</Text>
                </View>
                <View style={styles.rightCenterView}>
                    <Text style={styles.timeText}>{moment(create_at).format('YYYY-M-D H:k')}</Text>
                </View>
                <View style={styles.rightBottomView}>
                    <Markdown>{content}</Markdown>
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

    },
    rightCenterView: {

    },
    timeText: {
        fontSize: 11,
        color: '#666'
    },
    rightBottomView: {

    },
    contentText: {
        fontSize: 14
    }
})

export default TopicComment