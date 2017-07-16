import React, {Component, PropTypes} from 'react'
import {
    View,
    Text,
    Modal,
    Animated,
    TextInput,
    Dimensions,
    StyleSheet,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native'
import Portal from '../../base/Portal'
import ButtonView from '../../base/ButtonView'
import Toast from '../../base/Toast'
import {post} from '../../utils'
import {URL_PREFIX} from '../../constant/Constant'

class CommentInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: "",
            bottom: new Animated.Value(0)
        }
        this._close = this._close.bind(this)
        this._sendMessage = this._sendMessage.bind(this)
        this._onChangeTextHandler = this._onChangeTextHandler.bind(this)
    }


    static showCommentInput(options, callback) {
        const tag = Portal.allocateTag()
        Portal.showModal(tag, <CommentInput
            key={tag}
            {...options}
            onRequestClose={(data)=>{
                if(callback){
                    callback(data);
                }
                Portal.closeModal(tag)
            }}
        />)
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    render() {
        const textIsEmpty = this.state.text == '';
        return (
            <View>
                <Modal
                    transparent={true}
                    visible={true}
                    onRequestClose={()=>{}}
                >
                    <TouchableWithoutFeedback
                        onPress={this._close}
                    >
                        <View style={styles.mask}>
                            <TouchableWithoutFeedback>
                                <Animated.View
                                    style={[styles.container,{bottom: this.state.bottom}]}
                                >
                                    <View>
                                        <TextInput
                                            style={styles.textInput}
                                            value={this.state.value}
                                            autoFocus={true}
                                            underlineColorAndroid="transparent"
                                            placeholder={'Hello Word'}
                                            onChangeText={this._onChangeTextHandler}
                                        />
                                    </View>
                                    <ButtonView
                                        effect={ButtonView.EFFECT.DEFAULT}
                                        onPress={this._sendMessage}
                                    >
                                        <Text style={[styles.sendText,textIsEmpty ?styles.invalid: null]}>发送</Text>
                                    </ButtonView>
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }

    _keyboardWillShow(event) {
        Animated.timing(this.state.bottom, {
            duration: event.duration,
            toValue: event.endCoordinates.height
        }).start();
    }

    _keyboardWillHide(event) {
        Animated.timing(this.state.bottom, {
            duration: event.duration,
            toValue: 0
        }).start();
    }

    _onChangeTextHandler(text) {
        this.setState({
            text
        })
    }

    _close(data) {
        this.props.onRequestClose(data);
    }

    _sendMessage() {
        this.sendMessageData().then((result) => {
            if (result) {
                Toast.show('发送成功', Toast.DEFAULT, Toast.SHORT);
                this.props.refresh()
                this._close({
                    result
                });
            } else {
                Toast.show('发送失败', Toast.WARNING, Toast.SHORT);
            }
        })
    }

    async sendMessageData() {
        const {accessToken, replyId, topicId} = this.props;
        const url = `${URL_PREFIX}/topic/${topicId}/replies`
        const data = await post(url, {
            accesstoken: accessToken,
            content: this.state.text,
            reply_id: replyId
        });
        if (data.success) {
            return true
        } else {
            return false
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F9F9F9",
        borderTopColor: "#808080",
        borderBottomColor: "#808080",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    mask: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    textInput: {
        width: Dimensions.get('window').width - 60,
        height: 30,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#808080',
        borderRadius: 5,
        backgroundColor: '#FFF',
        paddingLeft: 8,
        paddingRight: 8
    },
    sendText: {
        width: 40,
        fontSize: 14,
        color: '#808080'
    },
    invalid: {
        color: "#D0D3D4"
    }
})

export default CommentInput