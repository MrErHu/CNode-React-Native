import React, {Component}from 'react'
import {
    Text,
    View,
    Image,
    Button,
    TextInput,
    StyleSheet
}from 'react-native'
import Toast from '../../base/Toast'
import LoginHelper from './LoginHelper'
import ButtonView from '../../base/ButtonView'
import ActionSheet from '../../base/ActionSheet'
import {headerStyle} from '../../constant/Constant'

const textInputPlaceHolder = '请输入Access Token'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textValue: 'f46e2ae0-1ae3-4640-9219-5a6db1263e07'
        }
        this.help = new LoginHelper(props)
        this._changeTextHandler = this._changeTextHandler.bind(this)
        this._loginButtonPressHandler = this._loginButtonPressHandler.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '登录',
            headerStyle: headerStyle,
            headerRight: (<ScanButton/>)
        }
    }

    render() {
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

    _changeTextHandler(textValue) {
        this.setState({
            textValue
        })
    }

    _loginButtonPressHandler() {
        const {textValue} = this.state;
        const {navigation} = this.props;
        this.help.doLogin(textValue).then(result => {
            if (result) {
                Toast.show(
                    '登录成功',
                    Toast.DEFAULT,
                    Toast.SHORT
                )
                navigation.goBack();
            } else {
                Toast.show(
                    '登录失败',
                    Toast.WARNING,
                    Toast.SHORT
                )
            }
        })
    }
}


const ScanButton = () => {
    const handler = ()=>{
        ActionSheet.showActionSheetWithOptions({
            options: ['拍摄', '从手机相册选择','取消'],
            cancelButtonIndex: 2
        },(index)=>{

        });
    }

    return (
        <ButtonView
            onPress={handler}
        >
            <Image
                source={require('../../asset/image/scan.png')}
                style={styles.scanImage}
            />
        </ButtonView>
    )
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
    },
    scanImage: {
        width: 24,
        height: 24,
        margin: 12
    },
    headerStyle: {
        backgroundColor: '#F8F8F8'
    }
})

export default Login