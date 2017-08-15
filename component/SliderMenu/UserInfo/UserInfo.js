import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    Image
}from 'react-native'

import {light,night} from './style'
import ButtonView from '../../../base/ButtonView'
import Icon from '../../../base/Icon'

class UserInfo extends Component {

    constructor(props, context) {
        super(props, context)
        this._loginHandler = this._loginHandler.bind(this)
        this._navigateUserScreen = this._navigateUserScreen.bind(this)
        this._logoutHandler = this._logoutHandler.bind(this)
    }

    static propTypes = {
        night: PropTypes.bool
    }

    static defaultProps = {
        night: false
    }

    static contextTypes = {
        actions: PropTypes.object
    }

    render() {
        const {isLogin, loginname, avatar_url} = this.props;
        const styles = this.props.night ? night : light;
        if (isLogin === false) {
            return (
                <View style={styles.userWithoutLoginView}>
                    <ButtonView
                        onPress={this._loginHandler}
                    >
                        <View style={styles.userWithoutLoginContainer}>
                            <Icon name="login"/>
                        </View>
                    </ButtonView>
                </View>
            )
        } else {
            return (
                <View style={[styles.userContent,styles.border]}>
                    <View style={styles.avatarView}>
                        <ButtonView
                            onPress={this._navigateUserScreen}
                        >
                            <Image
                                style={styles.userAvatar}
                                source={{uri: `${avatar_url}`}}
                            />
                        </ButtonView>
                    </View>
                    <View style={styles.userInfoView}>
                        <View style={styles.userInfoViewLeft}>
                            <ButtonView onPress={this._navigateUserScreen}>
                                <Text style={styles.font}>{loginname}</Text>
                            </ButtonView>
                        </View>
                        <View style={styles.userInfoViewRight}>
                            <ButtonView onPress={this._logoutHandler}>
                                <Text style={styles.font}>注销</Text>
                            </ButtonView>
                        </View>
                    </View>
                </View>
            )
        }
    }

    _loginHandler() {
        const {navigation, onRequestClose} = this.props
        onRequestClose(navigation.navigate('Login'));
    }

    _navigateUserScreen() {
        const {navigation, onRequestClose, loginname} = this.props
        onRequestClose(navigation.navigate('UserContent', {
            title: '我的主页',
            userName: loginname
        }));
    }

    _logoutHandler() {
        const {onRequestClose} = this.props
        onRequestClose(this.context.actions.logout())
    }
}

export default UserInfo
