import {StyleSheet} from 'react-native'
import {combineStyles} from '../../../utils'

const styles = {
    commentContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    avatarView: {
        width: 40,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginTop: 5
    },
    rightView: {
        flex: 1,
        marginTop: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#666'
    },
    nameText: {
        fontSize: 13
    },
    rightTopView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timeText: {
        fontSize: 11,
        color: '#666'
    },
    contentText: {
        fontSize: 14
    },
    operations: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightTopContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    praiseContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    font: {
    }
}

const lightStyle = {
    font: {
        color: '#000'
    }
}

const nightStyle = {
    font: {
        color: '#FFF'
    }
}

export const light = StyleSheet.create(combineStyles(styles, lightStyle))

export const night = StyleSheet.create(combineStyles(styles, nightStyle))