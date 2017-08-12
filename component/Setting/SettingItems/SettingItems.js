import React, {Component}from 'react'
import {
    View,
    Text,

} from 'react-native'
import {light, night} from './style'

export default function SettingItems(props) {
    const styles = props.night ? night : light;

    return (
        <View style={styles.items}>
            {props.children}
        </View>
    )
}