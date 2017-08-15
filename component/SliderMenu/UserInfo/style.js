import {StyleSheet} from 'react-native'
import {combineStyles} from '../../../utils'

const style = {
    userContent: {
        flex: 3,
        paddingTop: 20,
        flexDirection: 'column'
    },
    border: {
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc'
    },
    userInfoView: {
        flex: 1,
        flexDirection: 'row'
    },
    userInfoViewLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userInfoViewRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userWithoutLoginView: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    userWithoutLoginContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#00bcd4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userWithoutLoginContent: {
        width: 32,
        height: 32,
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32
    },
    avatarView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    font: {

    }
}

const lightStyle = {
    userContent: {
        backgroundColor: '#FFFFFF'
    },
    userWithoutLoginView: {
        backgroundColor: '#FFFFFF'
    },
    font: {
        color: '#000000'
    }
}

const nightStyle = {
    userContent: {
        backgroundColor: '#333333'
    },
    userWithoutLoginView: {
        backgroundColor: '#333333'
    },
    font: {
        color: '#FFFFFF'
    }
}

export const light = StyleSheet.create(combineStyles(style,lightStyle));

export const night = StyleSheet.create(combineStyles(style,nightStyle));