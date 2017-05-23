import React, {Component,PropTypes} from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import {headerStyle} from '../../constant/Constant'
import CategoryContainer from '../../container/CategoryContainer'
import TopicListContainer from '../../container/TopicListContainer'


class Home extends Component {

    constructor(props) {
        super(props);
    }

    static childContextTypes = {
        navigation: PropTypes.object
    }

    getChildContext() {
        return {
            navigation: this.props.navigation
        };
    }


    static navigationOptions = ({navigation}) => {
        return {
            title: '首页',
            headerStyle: headerStyle,
            headerLeft: <CategoryContainer
                navigation={navigation}
            />
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