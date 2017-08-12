import {StyleSheet} from 'react-native'
import {combineStyles} from '../../utils'

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    font:{}
}

const lightStyle = {
    container: {
        backgroundColor: '#e9e9ef'
    },
    font:{
        color: '#000'
    }
}

const nightStyle = {
    container: {
        flex: 1,
        backgroundColor: '#333'
    },
    font:{
        color: '#FFF'
    }
}

export const light = StyleSheet.create(combineStyles(styles,lightStyle))

export const night = StyleSheet.create(combineStyles(styles,nightStyle))