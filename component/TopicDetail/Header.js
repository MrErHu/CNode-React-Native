import React, {Component}from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import moment from 'moment'
import 'moment/locale/zh-cn'
import IconButton from '../../base/IconButton'
moment.locale('zh-cn')

const Header = (props) => {
    const {author, create_at} = props;
    return (
        <View style={styles.headerContainer}>
            <Image
                style={styles.avatar}
                source={{uri: author.avatar_url}}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{author.loginname}</Text>
                <Text style={styles.contentText}>创建于:{moment(create_at).locale('de').format('ll')}</Text>
            </View>
            <IconButton
                name="favorite"
                style={styles.favContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    contentText: {
        fontSize: 12
    },
    favContainer: {
        marginLeft: 10,
        marginRight: 10
    }

})

export default Header