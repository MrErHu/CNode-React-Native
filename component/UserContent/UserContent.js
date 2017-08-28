import React, {Component, PropTypes}from 'react'
import {
    View,
    StyleSheet
}from 'react-native'
import {headerStyle, headerTitleStyle, headerBackTitleStyle}from '../../constant/Constant'
import UserContentComponent from './UserContentComponent'
import UserContentHelper from './UserContentHelper'
import {combineStyles} from '../../utils'

class UserContent extends Component {

    constructor(props) {
        super(props)
        this._helper = new UserContentHelper()
        this.state = {}
    }

    static propTpypes = {
        userName: PropTypes.string.isRequired,
        setting: PropTypes.object
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerStyle,
            headerTitleStyle,
            headerBackTitleStyle
        }
    }

    static childContextTypes = {
        navigation: PropTypes.object,
        setting: PropTypes.object
    }

    getChildContext() {
        return {
            navigation: this.props.navigation,
            setting: this.props.setting
        };
    }

    componentWillMount() {
        const {userName} = this.props.navigation.state.params;
        this._helper.getData(userName).then((data) => {
            this.setState({
                data: data
            })
        })
    }

    render() {
        const styles = this.props.setting.night ? night : light;
        return (
            <View
                style={styles.container}
            >
                {
                    this.state.data && (
                        <UserContentComponent
                            {...this.state.data}
                        />
                    )
                }
            </View>
        )

    }
}

const styles = {
    container: {
        flex: 1
    }
}

const light = StyleSheet.create(combineStyles(styles, {
    container: {
        backgroundColor: '#FFF'
    }
}))

const night = StyleSheet.create(combineStyles(styles, {
    container: {
        backgroundColor: '#333'
    }
}))

export default UserContent