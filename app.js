import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {Provider} from 'react-redux'
import {StackNavigator} from 'react-navigation'

import configureStore from './store'
import TopicListContainer from './container/TopicListContainer'

const store = configureStore()

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TopicListContainer />
            </View>
        );
    }
}

App.navigationOptions = {
    title: 'Home'
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    }
});

const NavigatorApp = StackNavigator({
    Home: {
        screen: App
    }
})


export default class Enter extends Component {

    render() {
        return (
            <Provider store={store}>
                <NavigatorApp
                />
            </Provider>
        )
    }
}



