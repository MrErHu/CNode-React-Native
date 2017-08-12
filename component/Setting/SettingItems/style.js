import {StyleSheet} from 'react-native'
import {combineStyles} from '../../../utils'

const style = {
    items: {
        marginTop: 10,
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        height: 40
    }
}

const lightStyle = {
    items: {
        backgroundColor: '#FFF',
        borderColor: "#E5E5E5",
    }
}

const nightStyle = {
    items: {
        backgroundColor: '#4F4F4F',
        borderColor: "#555555",
    }
}

export const light = StyleSheet.create(combineStyles(style,lightStyle))
export const night = StyleSheet.create(combineStyles(style,nightStyle))

