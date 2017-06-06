import React, {Component} from 'react'
import {
    StyleSheet,
    View
} from 'react-native'

import Icon from '../Icon'
import ButtonView from '../ButtonView'

class IconButton extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pressed: false,
            selected: props.selected
        };
        this._onChange = this._onChange.bind(this);
        this._onPressIn = this._onPressIn.bind(this);
        this._onPressOut = this._onPressOut.bind(this);
    }

    static defaultProps = {
        effect: ButtonView.EFFECT.DEFAULT
    }

    _onChange(selected) {
        const {onChange} = this.props;
        this.setState({
            selected: !this.state.selected
        }, () => {
            onChange && onChange(this.state.selected)
        })
    }

    _onPressIn(e) {
        const {name, onPressIn} = this.props;
        if (Icon.hasPressedIcon(name)) {
            this.setState({
                pressed: true
            }, () => {
                onPressIn && onPressIn(e)
            })
        } else {
            onPressIn && onPressIn(e)
        }
    }

    _onPressOut(e) {
        const {name, onPressOut} = this.props;
        if (Icon.hasPressedIcon(name)) {
            this.setState({
                pressed: false
            }, () => {
                onPressOut && onPressOut(e)
            })
        } else {
            onPressOut && onPressOut(e)
        }
    }

    _isPressed() {
        return this.state.pressed === true && Icon.hasPressedIcon(this.props.name)
    }

    _isSelected() {
        return this.state.selected === true && Icon.hasSelectedIcon(this.props.name)
    }

    componentWillReceiveProps(nextProp){
        const {selected} = nextProp;
        if(typeof selected === 'boolean' && selected !== this.props.selected){
            this.setState({selected})
        }
    }

    render() {
        let {name, onChange, onPressIn, onPressOut, ...props} = this.props;
        const {selected, pressed} = this.state;
        if (this._isPressed()) {
            name = name + '-pressed';
        } else if (this._isSelected()) {
            name = name + '-selected';
        }
        return <ButtonView {...props} onChange={this._onChange} onPressIn={this._onPressIn}
                                      onPressOut={this._onPressOut}>
            <Icon name={name}/>
        </ButtonView>;
    }
}

export default IconButton