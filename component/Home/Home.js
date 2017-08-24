import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import PropTypes from 'prop-types'
import {headerStyle, headerTitleStyle, headerBackTitleStyle} from '../../constant/Constant'
import CategoryContainer from '../../container/CategoryContainer'
import TopicList from '../../component/TopicList'

class Home extends Component {

    constructor(props) {
        super(props);
    }

    static childContextTypes = {
        navigation: PropTypes.object,
    }

    getChildContext() {
        return {
            navigation: this.props.navigation,
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
        const {limit, mdrender, tab, setting} = this.props;
        return (
            <View>
                <TopicList
                    tab={tab}
                    limit={limit}
                    mdrender={mdrender}
                    setting={setting}
                />
            </View>
        );
    }
}

export default Home