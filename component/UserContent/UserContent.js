import React, {Component, PropTypes}from 'react'
import {
    View,
    StyleSheet
}from 'react-native'
import {headerStyle}from '../../constant/Constant'
import UserContentComponent from './UserContentComponent'
import UserContentHelper from './UserContentHelper'

class UserContent extends Component {

    constructor(props) {
        super(props)
        this._helper = new UserContentHelper()
        this.state = {}
    }

    static propTpypes = {
        userName: PropTypes.string.isRequired
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerStyle: headerStyle,
        }
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
        if (this.state.data) {
            return (
                <View
                    style={styles.container}
                >
                    <UserContentComponent
                        navigation = {this.props.navigation}
                        {...this.state.data}
                    />
                </View>
            )
        }
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1
    }
})

export default UserContent