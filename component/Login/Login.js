import React, {Component}from 'react'
import {
    Text,
    View,
    Image,
    Button,
    TextInput,
    StyleSheet
}from 'react-native'
import LoginHelper from './LoginHelper'
import {headerStyle} from '../../constant/Constant'
import ScanIcon from './ScanIcon'

const textInputPlaceHolder = '请输入Access Token'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textValue: 'f46e2ae0-1ae3-4640-9219-5a6db1263e07'
        }
        this.help = new LoginHelper(props)
        this._changeTextHandler = this._changeTextHandler.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: '登录',
            headerStyle: headerStyle,
            headerRight: (<ScanIcon />)
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