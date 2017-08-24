import {StyleSheet} from 'react-native'
import {combineStyles} from '../../utils'

const styles = {
    container: {
        position: 'relative'
    },
    loadingContainer: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width: 18,
        height: 18
    },
    addTopic: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden'
    }
}

const lightStyle = {
    container: {
        backgroundColor: '#FFF'
    }
}

const nightStyle = {
    container: {
        backgroundColor: '#333'
    }
}

export const light = StyleSheet.create(combineStyles(styles, lightStyle));
export const night = StyleSheet.create(combineStyles(styles, nightStyle));