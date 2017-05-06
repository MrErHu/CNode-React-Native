import React,{Component}from 'react'
import {
    Text,
    View,
    Button,
    TextInput,
    StyleSheet
}from 'react-native'
import Toast from '../../base/Toast'

const textInputPlaceHolder = '请输入Access Token'

class Login extends Component{

    constructor(props){
        super(props)
        this._changeTextHandler = this._changeTextHandler.bind(this)
        this._loginButtonPressHandler = this._loginButtonPressHandler.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '登录'
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextInput
                        style={styles.textInput}
                        autoFocus={true}
                        placeholder={textInputPlaceHolder}
                        underlineColorAndroid={"transparent"}
                        onChangeText={this._changeTextHandler}
                    />
                    <Button
                        title={'登录'}
                        onPress={this._loginButtonPressHandler}
                    />
                </View>
            </View>
        )
    }

    _changeTextHandler(textValue){
        this.setState({
            textValue
        })
    }

    _loginButtonPressHandler(){

        Toast.show(
            '登录成功',
            Toast.DEFAULT,
            Toast.SHORT
        )


        // Toast.show(
        //     '登录失败',
        //     Toast.WARNING,
        //     Toast.SHORT
        // )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    content: {
        flexDirection: 'column',
        marginTop: 100
    },
    textInput: {
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        width: 300,
        borderColor: '#00bcd4',
        borderWidth: 2,
        padding: 5
    }
})

export default Login