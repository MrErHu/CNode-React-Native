import React, {Component, PropTypes} from 'react'
import {
    View,
    Text,
    Modal,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import Portal from '../../base/Portal'
import ButtonView from '../../base/ButtonView'

class CommentInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        this._close = this._close.bind(this)
    }


    static showCommentInput() {
        const tag = Portal.allocateTag()
        Portal.showModal(tag, <CommentInput
            key={tag}
            onRequestClose={()=>{
                Portal.closeModal(tag)
            }}
        />)
    }

    render() {
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
                                <View style={styles.container}>
                                    <View>
                                        <TextInput
                                            style={styles.textInput}
                                            value={this.state.value}
                                            autoFocus={true}
                                            underlineColorAndroid="transparent"
                                            placeholder={'Hello Word'}
                                        />
                                    </View>
                                    <ButtonView
                                        effect={ButtonView.EFFECT.DEFAULT}
                                    >
                                        <Text style={[styles.sendText,styles.invalid]}>发送</Text>
                                    </ButtonView>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }

    _close() {
        this.props.onRequestClose();
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F9F9F9",
        borderTopColor: "#808080",
        borderBottomColor: "#808080",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth
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