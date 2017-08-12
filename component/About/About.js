import React, {Component}from 'react'
import {
    View,
    Text,
    Linking,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from '../../base/Icon'
import {light, night} from './style'
import IconButton from '../../base/IconButton'
import {headerStyle, headerTitleStyle,headerBackTitleStyle} from '../../constant/Constant'

class About extends Component {

    constructor(props) {
        super(props)
        this._openGithubUrl = this._openGithubUrl.bind(this)
    }

    static propTypes = {
        night: PropTypes.bool
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '关于',
            headerStyle: headerStyle,
            headerTitleStyle,
            headerBackTitleStyle
        }
    }

    render() {
        const styles = this.props.night ? night : light;
        const iconColor = this.props.night ? '#FFF': '#000';
        return (
            <View style={styles.container}>
                <Icon name="cnode-icon"/>
                <Text style={styles.font}>源码地址:</Text>
                <IconButton
                    name="github-icon"
                    color={iconColor}
                    onPress={this._openGithubUrl}
                />
            </View>
        )
    }

    _openGithubUrl() {
        var url = 'https://github.com/MrErHu/CNode-React-Native';
        Linking.openURL(url);
    }
}


export default About


