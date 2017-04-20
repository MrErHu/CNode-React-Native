import React,{Component,PropTypes}from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import TopicListItem from './TopicListItem'
import {URL_PREFIX} from '../../constant/Constant'

class TopicList extends Component{

    constructor(props){
        super(props);
    }

    static propTypes = {

    }

    static defaultProps = {
        
    }

    render(){
        return(
            <View style={styles.container}>
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