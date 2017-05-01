import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import CategoryContainer from '../../container/CategoryContainer'
import TopicListContainer from '../../container/TopicListContainer'


class Home extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = (navigation) => {
        return {
            title: '首页',
            headerLeft: <CategoryContainer />
        }
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

})

export default Home