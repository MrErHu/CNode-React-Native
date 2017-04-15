import React,{Component} from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import {StackNavigator} from 'react-navigation'

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.user}`,
    });
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}

class App extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Button
                    onPress={()=>navigate('Chat',{ user: 'Lucy' })}
                    title={'Chat'}
                />
            </View>
        );
    }
}

App.navigationOptions = {
    title: 'Welcome'
}

export default StackNavigator({
    App: {
        screen: App
    },
    Chat: {
        screen: ChatScreen
    }
})