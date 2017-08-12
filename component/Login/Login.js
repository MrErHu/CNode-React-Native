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
import ActionSheet from '../../base/ActionSheet'
import {headerStyle,headerTitleStyle} from '../../constant/Constant'
import QcCodeScan from '../QcCodeScan'
import ScanIcon from './ScanIcon'

const textInputPlaceHolder = '请输入Access Token'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textValue: 'f46e2ae0-1ae3-4640-9219-5a6db1263e07'
        }
        this.help = new LoginHelper(props)
        this._loginHandler = this._loginHandler.bind(this)
        this._changeTextHandler = this._changeTextHandler.bind(this)
        this._iconButtonPress = this._iconButtonPress.bind(this)

    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '登录',
            headerStyle,
            headerTitleStyle,
            headerRight: (<ScanIcon
                navigation={navigation}
            />)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextInput
                        style={styles.textInput}
                        autoFocus={true}
                        value={this.state.textValue}
                        placeholder={textInputPlaceHolder}
                        underlineColorAndroid={"transparent"}
                        onChangeText={this._changeTextHandler}
                    />
                    <Button
                        title={'登录'}
                        onPress={()=>{this._loginHandler(this.state.textValue)}}
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

    _loginHandler(accessToken){
        const {navigation} = this.props;
        this.help.doLogin(accessToken).then(result => {
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

    _iconButtonPress() {
        ActionSheet.showActionSheetWithOptions({
            options: ['拍摄', '从手机相册选择', '取消'],
            cancelButtonIndex: 2
        }, (index) => {
            if (index === 0) {
                QcCodeScan.showQcCodeScan({
                    onValueChange: (value)=>{this._loginHandler(value.data)}
                })
            }
        });
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
    },

    headerStyle: {
        backgroundColor: '#F8F8F8'
    }
})

export default Login