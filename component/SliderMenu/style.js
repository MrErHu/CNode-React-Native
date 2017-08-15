import {
    StyleSheet,
    Dimensions
} from 'react-native'
import {combineStyles} from '../../utils'

const {width:windowWidth, height:windowHeight} = Dimensions.get('window')

const style = {
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: windowWidth,
        height: windowHeight
    },
    content: {
        height: windowHeight,
        flexDirection: 'column'
    },
    buttonView: {
        flex: 1
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonActive: {
    },
    buttonIcon: {
        marginLeft: 20,
        marginRight: 30
    },
    buttonText: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
    },
    border: {
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc'
    }
}

const lightStyle = {
    content: {
        backgroundColor: '#FFFFFF',
    },
    buttonActive:{
        backgroundColor: '#F2F2F2',
    },
    buttonText: {
        color: '#666666'
    }
}

const nightStyle = {
    content: {
        backgroundColor: '#333333',
    },
    buttonActive:{
        backgroundColor: '#838B8B'
    },
    buttonText: {
        color: '#EEEEEE'
    }
}

export const light = StyleSheet.create(combineStyles(style, lightStyle));

export const night = StyleSheet.create(combineStyles(style, nightStyle));