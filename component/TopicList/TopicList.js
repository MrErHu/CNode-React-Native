import React,{Component}from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import TopicListItem from './TopicListItem'

class TopicList extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <TopicListItem/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    }
})

export default TopicList