import React, {Component} from 'react'
import {
    View,
    Text,
    Switch,
    StyleSheet
} from 'react-native'
import {headerStyle, headerTitleStyle} from '../../constant/Constant'
import SettingItems from './SettingItems'
import PropTypes from 'prop-types'

class SettingComponent extends Component {

    constructor(props) {
        super(props);
        this._onSwitchValueChange = this._onSwitchValueChange.bind(this);
    }

    static propTypes = {
        night: PropTypes.bool
    }

    static defaultProps = {
        night: false
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '设置',
            headerStyle: headerStyle,
            headerTitleStyle: headerTitleStyle,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SettingItems>
                    <View style={styles.setting}>
                        <Text style={styles.font}>夜间模式</Text>
                        <Switch
                            value={this.props.night}
                            onValueChange={this._onSwitchValueChange}
                        />
                    </View>
                </SettingItems>
            </View>
        )
    }

    _onSwitchValueChange(status){
        this.props.actions.setNight(status);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    setting: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    font: {
        fontSize: 15
    },
})

export default SettingComponent;