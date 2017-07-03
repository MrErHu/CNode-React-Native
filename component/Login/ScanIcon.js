import React, {Component, PropTypes}from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators}from 'redux'
import Toast from '../../base/Toast'
import * as actions from '../../action/loginAction'
import ActionSheet from '../../base/ActionSheet'
import QcCodeScan from '../QcCodeScan'
import IconButton from '../../base/IconButton'


class ScanIcon extends Component {

    constructor(props) {
        super(props)
        this._loginHandler = this._loginHandler.bind(this)
        this._iconButtonPress = this._iconButtonPress.bind(this)
    }

    render() {
        return (
            <IconButton
                name="scan"
                style={styles.scanImage}
                onPress={this._iconButtonPress}
            />
        )
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
}

const styles = StyleSheet.create({
    scanImage: {
        margin: 20
    }
})

const mapStateToDispatch = (dispatch) => {
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(null,mapStateToDispatch)(ScanIcon)