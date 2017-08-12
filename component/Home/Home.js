import React, {Component} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import {headerStyle, headerTitleStyle} from '../../constant/Constant'
import CategoryContainer from '../../container/CategoryContainer'
import TopicList from '../../component/TopicList'

class Home extends Component {

    constructor(props) {
        super(props);
    }

    static childContextTypes = {
        navigation: PropTypes.object,
        night: PropTypes.bool
    }

    getChildContext() {
        return {
            navigation: this.props.navigation,
            night: this.props.setting.night
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '首页',
            headerStyle: headerStyle,
            headerTitleStyle: headerTitleStyle,
            headerLeft: (
                <CategoryContainer
                    navigation={navigation}
                />
            )
        }
    }

    render() {
        const {limit,mdrender,tab} = this.props;
        return (
            <View style={styles.container}>
                <TopicList
                    limit={limit}
                    mdrender={mdrender}
                    tab={tab}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    }
})

export default Home