import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import {Provider} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import configureStore from './store'
import TopicListContainer from './container/TopicListContainer'
import Portal from './base/Portal'
import SliderMenu from './component/SliderMenu'

const store = configureStore()

const Category = () => {
    return(
        <TouchableWithoutFeedback
            onPress={()=>{
                SliderMenu.showSliderMenuWithOptions();
            }}
        >
            <Image
                source={require('./asset/image/category.png')}
                style={styles.category}
            />
        </TouchableWithoutFeedback>
    )
}

class App extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: '首页',
        headerLeft: <Category />
    }

    render() {
        return (
            <View style={styles.container}>
                <TopicListContainer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    category: {
        width: 20,
        height: 20,
        marginLeft: 15,
        marginTop: 5
    }
})

const NavigatorApp = StackNavigator({
    Home: {
        screen: App,
    }
})


export default class Enter extends Component {

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <NavigatorApp
                    />
                    <Portal/>
                </View>
            </Provider>
        )
    }
}



