import {StyleSheet} from 'react-native'
import {combineStyles} from '../../../utils'

const style = {
    userContentContainer: {
        flex: 1
    },
    userAvatarContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginBottom: 15
    },
    userTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userBottomText: {},
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10
    },
    userTime: {
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userScore: {
        fontSize: 12,
        marginRight: 20
    },
    topicItemContainer: {
        flex: 3,
    },
    buttonGroup: {
        height: 50,
        flexDirection: 'row'
    },
    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#666'
    },
    topicContainer: {
        flex: 1
    },
    selectedStyle: {
        borderBottomWidth: 4,
        borderBottomColor: '#387ef5'
    },
    font: {

    }
}

const lightStyle = {
    userContentContainer: {
        backgroundColor: '#FFF'
    },
    font: {
        color: '#000'
    }
}

const nightStyle = {
    userContentContainer: {
        backgroundColor: '#333'
    },
    font: {
        color: '#FFF'
    }
}

export const light = StyleSheet.create(combineStyles(style,lightStyle))

export const night = StyleSheet.create(combineStyles(style,nightStyle))
