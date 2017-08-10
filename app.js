import React, {Component} from 'react'
import {View, AsyncStorage, StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import {persistStore} from 'redux-persist-immutable'
import configureStore from './store'
import Portal from './base/Portal'

import TopicDetail from './container/TopicDetailContainer'
import Home from './container/HomeContainer'
import Login from './container/LoginContainer'
import Setting from './container/SettingContainer'
import About from './component/About'
import Message from './component/Message'
import UserContent from './component/UserContent'

const store = configureStore()

//Redux store持久化
persistStore(store,{
    whitelist: ['login'],
    storage: AsyncStorage,
},()=>{
    console.log('本地持久化存储成功');
});

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
    },
    Setting: {
        screen: Setting
    }
})

export default class Enter extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor="#333333"
                        barStyle="light-content"
                    />
                    <NavigatorApp />
                    <Portal/>
                </View>
            </Provider>
        )
    }
}



