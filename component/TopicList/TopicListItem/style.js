import {StyleSheet} from 'react-native'
import {combineStyles} from '../../../utils'

const style = {
    container: {
        height: 100,
        flexDirection: 'column',
        borderBottomWidth: 0.5,
        borderBottomColor: '#666',
        padding: 15
    },
    title: {
        height: 20,
        flexDirection: 'row',
        marginBottom: 10
    },
    tabView: {
        width: 40,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#80bd01'
    },
    tabText: {
        color: '#FFF'
    },
    titleContent: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    detail: {
        flex: 1,
        flexDirection: 'row'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    centerContent: {
        flex: 1,
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    rightContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: 70
    },
    detailText: {
        fontSize: 13,
        fontFamily: 'Helvetica',
        color: '#888'
    }
};


const lightStyle = {
    container: {
        backgroundColor: '#FFFFFF',
    },
    titleContent: {
        color: '#000000'
    }

}

const nightStyle = {
    container: {
        backgroundColor: '#333333',
    },
    titleContent:{
        color: '#FFFFFF'
    }
}

export const night = StyleSheet.create(combineStyles(style, nightStyle));
export const light = StyleSheet.create(combineStyles(style, lightStyle));
