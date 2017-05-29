import React,{Component,PropTypes}from 'react'
import {
    View,
    Text,
    StyleSheet
}from 'react-native'
import {headerStyle} from '../../constant/Constant'
import TopicDetailHelper from './TopicDetailHelper'
import Markdown from 'react-native-markdown'

import Header from './Header'

class TopicDetail extends Component{

    constructor(props){
        super(props)
        this._helper = new TopicDetailHelper()
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerStyle: headerStyle,
        }
    }

    componentWillMount(){
        const {topicId} = this.props.navigation.state.params
        this._helper.getData(topicId).then((data)=>{
            this.setState({
                data: data
            })
        })
    }

    render(){
        if(!this.state){
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        const {title,content} = this.state.data
        return(
            <View style={styles.container}>
                <Header
                    {...this.state.data}
                />
                <View style={styles.titleContainer}>
                    <Text
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {title}
                    </Text>
                </View>
                <Markdown>
                    {content}
                </Markdown>
            </View>
        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})

export default TopicDetail