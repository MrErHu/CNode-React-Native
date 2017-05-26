import React, {Component,PropTypes}from 'react'
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

import ButtonView from '../../base/ButtonView'

class UserInfo extends Component{

    constructor(props,context){
        super(props,context)
        this._loginHandler = this._loginHandler.bind(this)
        this._navigateUserScreen = this._navigateUserScreen.bind(this)
        this._logoutHandler = this._logoutHandler.bind(this)
    }

    static contextTypes = {
        actions: PropTypes.object
    }

    render(){
        const {isLogin,loginname, avatar_url} = this.props
        if (isLogin === false) {
            return (
                <View style={styles.userWithoutLoginView}>
                    <TouchableWithoutFeedback
                        onPress={this._loginHandler}
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
            return (
                <View style={[styles.userContent,styles.border]}>
                    <View style={styles.avatarView}>
                        <TouchableWithoutFeedback
                            onPress={this._navigateUserScreen}
                        >
                            <Image
                                style={styles.userAvatar}
                                source={{uri: `${avatar_url}`}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.userInfoView}>
                        <View style={styles.userInfoViewLeft}>
                            <Text>{loginname}</Text>
                        </View>
                        <View style={styles.userInfoViewRight}>
                            <ButtonView onPress={this._logoutHandler}>
                                <Text>注销</Text>
                            </ButtonView>
                        </View>
                    </View>
                </View>
            )
        }
    }

    _loginHandler(){
        const {navigation, onRequestClose} = this.props
        onRequestClose(navigation.navigate('Login'));
    }

    _navigateUserScreen(){
        const {navigation, onRequestClose,loginname} = this.props
        onRequestClose(navigation.navigate('UserContent',{
            title: '我的主页',
            userName: loginname
        }));
    }

    _logoutHandler(){
        const {onRequestClose} = this.props
        onRequestClose(this.context.actions.logout())
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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