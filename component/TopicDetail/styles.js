import {StyleSheet} from 'react-native'
import {combineStyles} from '../../utils'


const styles = {
    container: {
        flex: 1
    },
    font: {

    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingRight: 10
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20
    },
    commentContainer: {
        paddingTop: 20,
    },
    detailContent: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#666'
    }
}

const lightStyle = {
    container: {
        backgroundColor: '#e9e9ef'
    },
    scrollContainer:{
        backgroundColor: '#e9e9ef'
    },
    font: {
        color: '#000'
    }
}

const nightStyle = {
    container: {
        backgroundColor: '#333'
    },
    scrollContainer:{
        backgroundColor: '#333'
    },
    font: {
        color: '#FFF'
    }
}

export const light = StyleSheet.create(combineStyles(styles, lightStyle))

export const night = StyleSheet.create(combineStyles(styles, nightStyle))