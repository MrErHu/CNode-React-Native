import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'

import Colors from './Colors'

class ButtonView extends Component {

    static propTypes = {
        disabled: PropTypes.bool,
        invalid: PropTypes.bool,
        stopPropagation: PropTypes.bool,
        effect: PropTypes.number,
        once: PropTypes.bool
    };

    static EFFECT = {
        DEFAULT: 0,
        HIGHLIGHT: 1,
        OPACITY: 2
    };

    static defaultProps = {
        selected: null,
        disabled: false,
        invalid: false,
        stopPropagation: false,
        effect: 1,
        once: false,
        onChange: ()=>{},
        onPress: ()=>{}
    };

    constructor(props, context) {
        super(props, context);
        const {selected} = props;
        this.state = {selected};
        this._onPress = this._onPress.bind(this);
        this._onPressIn = this._onPressIn.bind(this);
        this._onPressOut = this._onPressOut.bind(this);
    }

    componentWillReceiveProps(props) {
        const {selected} = props;
        this.setState({
            selected
        })
    }

    render() {
        const {
            selected: sel, effect, invalid, disabled, once, stopPropagation,
            pressedStyle, selectedStyle, underlayColor, activeOpacity,
            onPress, onPressIn, onPressOut, ...props
        } = this.props, {pressed, selected} = this.state;
        if (disabled === true) {
            return <View {...props} style={[styles.disabled, props.style]}>
                {props.children}
            </View>
        }
        if (invalid === true) {
            return <View {...props}>
                {props.children}
            </View>
        }
        const stl = [props.style, selected === true ? selectedStyle : null, pressed ? pressedStyle : null];
        switch (effect) {
            case ButtonView.EFFECT.HIGHLIGHT:
                return <TouchableHighlight {...props}
                    style={stl}
                    onPress={this._onPress}
                    onPressIn={this._onPressIn} onPressOut={this._onPressOut}
                    underlayColor={props.underlayColor || Colors.PRESS}>
                    {props.children}
                </TouchableHighlight>;
            case ButtonView.EFFECT.OPACITY:
                return <TouchableOpacity {...props}
                    style={stl}
                    onPress={this._onPress}
                    onPressIn={this._onPressIn} onPressOut={this._onPressOut}
                    activeOpacity={activeOpacity || 0.5}>
                    {props.children}
                </TouchableOpacity>;
            default:
                return <TouchableWithoutFeedback onPress={this._onPress}
                                                 onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
                    <View {...props}
                        style={stl}>
                        {props.children}
                    </View>
                </TouchableWithoutFeedback>
        }
    }

    _onPress(e) {
        if (this.props.invalid === false && (this.state.selected === false || this.state.selected === true)) {
            if (this.state.selected === false || this.props.once === false) {
                this.setState({
                    selected: !this.state.selected
                }, () => {
                    this.props.onChange(this.state.selected);
                });
            }
        }
        if (!(this.props.once === true && this.state.selected === true)) {
            this.props.onPress(e);
        }
        if (this.props.stopPropagation) {
            e.stopPropagation();
        }
    }

    _onPressIn(e) {
        if (this.props.pressedStyle) {
            this.setState({
                pressed: true
            });
        }
        this.props.onPressIn && this.props.onPressIn(e);
    }

    _onPressOut(e) {
        if (this.props.pressedStyle) {
            this.setState({
                pressed: false
            });
        }
        this.props.onPressOut && this.props.onPressOut(e);
    }
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.2
    }
});
export default ButtonView
