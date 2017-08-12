import {StyleSheet} from 'react-native'
import {combineStyles} from '../../utils'

const style = {
    container: {
        flex: 1,
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
}

const lightStyle = {
    container: {
        backgroundColor: '#e9e9ef'
    },
    font: {
        color: "#000000"
    }
}

const nightStyle = {
    container: {
        backgroundColor: '#333333'
    },
    font: {
        color: "#FFFFFF"
    },
}

export const light = StyleSheet.create(combineStyles(style,lightStyle))

export const night = StyleSheet.create(combineStyles(style,nightStyle))