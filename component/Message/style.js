import {StyleSheet} from 'react-native'
import {combineStyles} from '../../utils'

const styles = {
    container: {
        flex: 1
    },
    font: {}
}

const lightStyle = {
    container: {
        backgroundColor: '#FFF'
    },
    font: {
        color: '#000'
    }
}

const nightStyle = {
    container: {
        backgroundColor: '#333'
    },
    font: {
        color: '#FFF'
    }
}

export const light = StyleSheet.create(combineStyles(styles,lightStyle))

export const night = StyleSheet.create(combineStyles(styles,nightStyle))