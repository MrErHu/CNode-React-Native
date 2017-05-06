import React,{Component}from 'react'
import {
    View,
    Text,
    Image,
    Easing,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback
}from 'react-native'


const UserInfo = (props) => {
    const {isLogin,navigation,onRequestClose} = props
    if (isLogin === false) {
        return (
            <View style={styles.userWithoutLoginView}>
                <TouchableWithoutFeedback
                    onPress={
                        ()=>{
                            onRequestClose(navigation.navigate('Login'));
                        }
                    }
                >
                    <View style={styles.userWithoutLoginContainer}>
                        <Image
                            source={require('../../asset/image/login.png')}
                            style={styles.userWithoutLoginContent}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    } else {
        const {loginname,avatar_url} = props;
        return (
            <View style={[styles.userContent,styles.border]}>
                <View style={styles.avatarView}>
                    <Image
                        style={styles.userAvatar}
                        source={{uri: `${avatar_url}`}}
                    />
                </View>
                <View style={styles.userInfoView}>
                    <View style={styles.userInfoViewLeft}>
                        <Text style={styles.userInfoViewLeftText}>{loginname}</Text>
                        <Text style={styles.userInfoViewLeftText}>积分: 370</Text>
                    </View>
                    <View style={styles.userInfoViewRight}>
                        <Text>注销</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default UserInfo

const styles = StyleSheet.create({
    userContent: {
        flex: 3,
        paddingTop: 20,
        flexDirection: 'column'
    },
    border: {
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc'
    },
    userInfoView: {
        flex: 1,
        flexDirection: 'row'
    },
    userInfoViewLeft: {
        flex: 2,
        flexDirection: 'column'
    },
    userInfoViewLeftText: {
        flex: 1,
        marginLeft: 20
    },
    userInfoViewRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userWithoutLoginView: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    userWithoutLoginContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#00bcd4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userWithoutLoginContent: {
        width: 32,
        height: 32,
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32
    },
    avatarView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})