import {Dimensions, Image, View, StyleSheet, Text, Linking} from 'react-native'
import {combineStyles} from '../../utils'

const screenWidth = Dimensions.get("window").width
const fontSize = 14
const rowMargin = 5


const styles = {
    image: {
        width: screenWidth - 20,
        height: screenWidth - 20,
        resizeMode: Image.resizeMode.contain
    },
    p: {
        fontSize,
    },
    pwrapper: {
        marginTop: 5,
        marginBottom: 5
    },
    a: {
        color: 'royalblue',
        fontSize: fontSize,
        paddingLeft: 4,
        paddingRight: 4,
        marginRight: 10,
        marginLeft: 10
    },
    h1: {
        fontSize: fontSize * 1.6,
        fontWeight: "bold",
    },
    h1wrapper: {
        marginTop: rowMargin,
        marginBottom: rowMargin
    },
    h2: {
        fontSize: fontSize * 1.5,
        fontWeight: 'bold',
    },
    h2wrapper: {
        marginBottom: rowMargin,
        marginTop: rowMargin
    },
    h3: {
        fontWeight: 'bold',
        fontSize: fontSize * 1.4,
    },
    h3wrapper: {
        marginBottom: rowMargin - 2,
        marginTop: rowMargin - 2
    },
    h4: {
        fontSize: fontSize * 1.3,
        fontWeight: 'bold'
    },
    h4wrapper: {
        marginBottom: rowMargin - 2,
        marginTop: rowMargin - 2,
    },
    h5: {
        fontSize: fontSize * 1.2,
        fontWeight: 'bold'
    },
    h5wrapper: {
        marginBottom: rowMargin - 3,
        marginTop: rowMargin - 3,
    },
    h6: {
        fontSize: fontSize * 1.1,
        fontWeight: 'bold'
    },
    h6wrapper: {
        marginBottom: rowMargin - 3,
        marginTop: rowMargin - 3
    },
    li: {
        fontSize: fontSize * 0.9,
    },
    liwrapper: {
        paddingLeft: 20,
        marginBottom: 10
    },
    strong: {
        fontWeight: 'bold'
    },
    em: {
        fontStyle: 'italic'
    },
    codeScrollView: {
        backgroundColor: '#333',
        flexDirection: 'column',
        marginBottom: 15
    },
    codeRow: {
        flex: 1,
        flexDirection: 'row',
        height: 25,
        alignItems: 'center'
    },
    codeFirstRow: {
        paddingTop: 20,
        height: 25 + 20
    },
    codeLastRow: {
        paddingBottom: 20,
        height: 25 + 20
    },
    codeFirstAndLastRow: {
        paddingBottom: 20,
        height: 25 + 40,
        paddingTop: 20
    },
    lineNum: {
        width: 55,
    },
    lineNumWrapper: {
        width: 55,
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    codeWrapper: {
        flexDirection: 'column'
    },
    codeLineWrapper: {
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    blockquotewrapper: {
        paddingLeft: 20,
        borderLeftColor: '#3498DB',
        borderLeftWidth: 3
    }
}

const lightStyle = {
    p:{
        color: "rgba(0,0,0,0.8)"
    },
    h1:{
        color: 'rgba(0,0,0,0.8)'
    },
    h2: {
        color: 'rgba(0,0,0,0.85)'
    },
    h3: {
        color: 'rgba(0,0,0,0.8)'
    },
    h4:{
        color: 'rgba(0,0,0,0.7)',
    },
    h5:{
        color: 'rgba(0,0,0,0.7)',
    },
    h6:{
        color: 'rgba(0,0,0,0.7)',
    },
    li:{
        color: 'rgba(0,0,0,0.7)',
    },
    lineNum: {
        color: 'rgba(0,0,0,0.5)',
    }
}

const nightStyle = {
    p:{
        color: "rgba(255,255,255,0.8)"
    },
    h1:{
        color: "rgba(255,255,255,0.8)"
    },
    h2:{
        color: "rgba(255,255,255,0.85)"
    },
    h3: {
        color: "rgba(255,255,255,0.8)"
    },
    h4:{
        color: 'rgba(255,255,255,0.7)',
    },
    h5:{
        color: 'rgba(255,255,255,0.7)',
    },
    h6:{
        color: 'rgba(255,255,255,0.7)',
    },
    li:{
        color: 'rgba(255,255,255,0.7)',
    },
    lineNum: {
        color: 'rgba(255,255,255,0.5)',
    }
}

export const night = combineStyles(styles, nightStyle)
export const light = combineStyles(styles, lightStyle)
