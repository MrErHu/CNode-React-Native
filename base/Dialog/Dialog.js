import React, {Component} from 'react';
import mixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin';
import {
    StyleSheet,
    Platform,
    Animated,
    Easing,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    Modal
} from 'react-native'

const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
const DIALOG_HEIGHT = 259;
class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0)
        };
        this._open = this._open.bind(this);
        this._close = this._close.bind(this);
    }

    render() {
        const {height = DIALOG_HEIGHT, contentContainerStyle, style} = this.props;
        return (
            <View style={[styles.container, style]}>
                <Modal
                    {...this.props}
                    visible={this.state.visible}
                    transparent={true}
                    supportedOrientations={SUPPORTED_ORIENTATIONS}
                    onRequestClose={this._onRequestClose}
                >
                    <TouchableWithoutFeedback onPress={this._close}>
                        <Animated.View style={[styles.mask, {
                            opacity: this.state.opacity
                        }]}>
                            <TouchableWithoutFeedback>
                                <Animated.View style={[styles.placeholder, contentContainerStyle,{
                                    height: height,
                                    transform: [{
                                        translateY: this.state.offset.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [height, 0]
                                        })
                                    }]
                                }]}>
                                    {this.props.children}
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }

    _onRequestClose() {

    }

    _open() {
        this.setState({
            visible: true
        }, () => {
            Animated.parallel([
                Animated.timing(
                    this.state.opacity,
                    {
                        easing: Easing.linear,
                        duration: 500,
                        toValue: 1
                    }
                ),
                Animated.timing(
                    this.state.offset,
                    {
                        easing: Easing.linear,
                        duration: 500,
                        toValue: 1
                    }
                )
            ]).start();
        });
    }

    _close(op) {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0
                }
            )
        ]).start((endState) => {
            this.setState({
                visible: false
            }, () => {
                this.props.onRequestClose && this.props.onRequestClose(op);
            });
        });
    }

    open() {
        this._open();
    }

    dismiss(op) {
        this._close(op);
    }
}

const styles = StyleSheet.create({
    container: {},
    mask: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    placeholder: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    }
});

mixin.onClass(Dialog, TimerMixin);

export default Dialog