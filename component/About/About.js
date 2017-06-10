import React, {Component}from 'react'
import {
    View,
    Text,
    Linking,
    StyleSheet
} from 'react-native'
import Icon from '../../base/Icon'
import IconButton from '../../base/IconButton'
import {headerStyle} from '../../constant/Constant'

class About extends Component {

    constructor(props) {
        super(props)
        this._openGithubUrl = this._openGithubUrl.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '关于',
            headerStyle: headerStyle
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name="cnode-icon"
                />
                <Text>源码地址:</Text>
                <IconButton
                    name="github-icon"
                    onPress={this._openGithubUrl}
                />
            </View>
        )
    }

    _openGithubUrl(){
        var url = 'https://github.com/MrErHu/CNode-React-Native';
        Linking.openURL(url);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default About


