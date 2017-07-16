import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import {Provider, connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {persistStore} from 'redux-persist-immutable'
import configureStore from './store'
import Portal from './base/Portal'

import UserContent from './component/UserContent'
import TopicDetail from './container/TopicDetailContainer'

import Home from './container/HomeContainer'
import Login from './container/LoginContainer'
import About from './component/About'
import Message from './component/Message'

const store = configureStore()
persistStore(store,{
    whitelist: ['login'],
    storage: AsyncStorage,
},()=>{
    console.log('本地持久化存储成功');
})

const NavigatorApp = StackNavigator({
    Home: {
        screen: Home
    },
    Login: {
        screen: Login
    },
    UserContent: {
        screen: UserContent
    },
    TopicDetail: {
        screen: TopicDetail
    },
    About: {
        screen: About
    },
    Message: {
        screen: Message
    }
})

export default class Enter extends Component {

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <NavigatorApp />
                    <Portal/>
                </View>
            </Provider>
        )
    }
}



