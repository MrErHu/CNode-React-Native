import React,{Component,PropTypes}from 'react'
import {
    View,
    Text,
    StyleSheet
}from 'react-native'
import {headerStyle} from '../../constant/Constant'
import TopicDetailHelper from './TopicDetailHelper'

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
                    <Text>Hello Wolrd</Text>
                </View>
            )
        }
        console.log(JSON.stringify(this.state.data))
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})

export default TopicDetail