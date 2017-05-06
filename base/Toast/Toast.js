import React, {Component} from 'react';
import {decorate as mixin} from 'react-mixin'
import TimerMixin from 'react-timer-mixin';
import {
    StyleSheet,
    ToastIOS,
    Platform,
    Animated,
    Easing,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
    Modal
} from 'react-native'
import Colors from './Colors'
import Portal from '../Portal'

const TOAST_HEIGHT = 54;
@mixin(TimerMixin)

class Toast extends Component {
    static SHORT = 2000;
    static LONG = 3500;
    static DEFAULT = Colors.HIGHLIGHT;
    static WARNING = Colors.DESTRUCTIVE;

    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0)
        };
    }

    static defaultProps = {
        options: []
    };

    static show(message, color, duration) {
        const tag = Portal.allocateTag();
        Portal.showModal(tag, <Toast
            key={tag}
            message={message}
            color={color}
            duration={duration}
            onRequestClose={() => {
                Portal.closeModal(tag);
            }}
        />)
    }

    componentDidMount() {
        const {duration = Toast.SHORT} = this.props;
        this._open();
        this.setTimeout(() => {
            this._close()
        }, duration)
    }

    render() {
        const {message, color = Toast.DEFAULT} = this.props;
        return (
            <Animated.View style={[styles.tip, {
                opacity: this.state.opacity,
                backgroundColor: color,
                transform: [{
                    translateY: this.state.offset.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-TOAST_HEIGHT, 0]
                    })
                }]
            }]}>
                <Text style={[styles.message]}>{message}</Text>
            </Animated.View>
        )
    }

    _open() {
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
    }

    _close() {
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
            this.props.onRequestClose && this.props.onRequestClose();
        });
    }
}

const styles = StyleSheet.create({
    tip: {
        alignItems: 'center',
        paddingTop: 30,
        position: 'absolute',
        height: TOAST_HEIGHT,
        left: 0,
        right: 0
    },

    message: {
        color: Colors.DEFAULT,
        fontSize: 16
    }
});

export default Toast