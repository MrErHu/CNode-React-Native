import React, {Component} from 'react'
import {
    View,
    Text,
    Switch,
} from 'react-native'
import PropTypes from 'prop-types'
import {light,night}from './style'
import {headerStyle, headerTitleStyle, headerBackTitleStyle} from '../../constant/Constant'
import SettingItems from './SettingItems/SettingItems'


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
            headerTitleStyle,
            headerBackTitleStyle
        }
    }

    render() {
        const styles = this.props.night ? night : light;
        return (
            <View style={styles.container}>
                <SettingItems night={this.props.night}>
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

export default SettingComponent;