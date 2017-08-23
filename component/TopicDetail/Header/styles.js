import {StyleSheet} from 'react-native'
import {combineStyles} from '../../../utils'


const styles = {
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    contentText: {
        fontSize: 12
    },
    favContainer: {
        marginLeft: 10,
        marginRight: 10
    }
}

const lightStyle = {
    headerContainer: {
        backgroundColor: '#e9e9ef'
    },
    contentText: {
        color: '#000'
    }
}

const nightStyle = {
    headerContainer: {
        backgroundColor: '#333'
    },
    contentText: {
        color: '#FFF'
    }
}

export const light = StyleSheet.create(combineStyles(styles, lightStyle))

export const night = StyleSheet.create(combineStyles(styles, nightStyle))