import React, {Component}from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {headerStyle} from '../../constant/Constant'
import MessageHelper from './MessageHelper'
import MessageList from './MessageList'

class Message extends Component {

    constructor(props) {
        super(props)
        this.helper = new MessageHelper();

    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '我的消息',
            headerStyle: headerStyle
        }
    }

    componentWillMount(){
        this.helper.getData(this.props).then((data)=>{
            this.setState({
                data: data
            })
        })
    }

    render() {
        if(!this.state){
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollableTabView>
                    <MessageList
                        tabLabel="未读消息"
                        data={this.state.data.hasnot_read_messages}
                    />
                    <MessageList
                        tabLabel="已读消息"
                        data={this.state.data.has_read_messages}
                    />
                </ScrollableTabView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})

export default Message