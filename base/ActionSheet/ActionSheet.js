import React, {Component} from 'react';
import mixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin';
import {
    StyleSheet,
    ActionSheetIOS,
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
import Dialog from '../Dialog'
import ButtonView from '../ButtonView'

const TITLE_HEIGHT = 52;
const BUTTON_HEIGHT = 67;
const GAP = 10;

class ActionSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0)
        };
        this._handleRef = this._handleRef.bind(this);
        this._onRequestClose = this._onRequestClose.bind(this);
        this._onDestruct = this._onDestruct.bind(this);
        this._onItemSelected = this._onItemSelected.bind(this);
    }

    static defaultProps = {
        options: []
    };

    static showActionSheetWithOptions(options, callback) {
        const tag = Portal.allocateTag();
        Portal.showModal(tag, <ActionSheet
            key={tag}
            {...options}
            onRequestClose={(buttonIndex) => {
                Portal.closeModal(tag);
                callback && callback(buttonIndex);
            }}
        />)
    }

    componentDidMount() {
        this.root && this.root.open();
    }

    _onItemSelected(buttonIndex) {
        this.root && this.root.dismiss(buttonIndex);
    }

    _onRequestClose() {
        this._onItemSelected(this.props.cancelButtonIndex);
    }

    _onDestruct() {
        this._onItemSelected(this.props.destructiveButtonIndex);
    }

    _handleRef(ref) {
        this.root = ref;
    }

    render() {
        const {options, cancelButtonIndex, destructiveButtonIndex, title, message} = this.props;
        let cancelBtn, destructiveBtn, titleView, height = options.length * BUTTON_HEIGHT;
        const buttons = [];
        if (title !== null && title !==undefined && title !== '') {
            titleView = <View key='title' style={styles.titleView}>
                <Text style={styles.titleText}>{this.props.title}</Text>
            </View>;
            height += TITLE_HEIGHT;
        }
        if (cancelButtonIndex != null) {
            cancelBtn = <ButtonView key="cancel" style={[styles.button, styles.cancelButton]}
                                    pressedStyle={styles.cancelButtonPressedStyle}
                                    onPress={this._onRequestClose}>
                <Text style={styles.cancelButtonText}>{options[cancelButtonIndex]}</Text>
            </ButtonView>;
            height += 2 * GAP;
        }
        if (destructiveButtonIndex != null) {
            destructiveBtn = <ButtonView key='destructive' style={[styles.buttonView, styles.destructiveButton]}
                                         pressedStyle={styles.destructiveButtonPressedStyle}
                                         onPress={this._onDestruct}>
                <Text style={styles.destructButtonText}>{options[destructiveButtonIndex]}</Text>
            </ButtonView>;
        }
        options.forEach((text, buttonIndex) => {
            if (buttonIndex === cancelButtonIndex || buttonIndex === destructiveButtonIndex) {
                return;
            }
            buttons.push(<ButtonView key={buttonIndex}
                                     style={styles.buttonView}
                                     pressedStyle={(title == null && buttons.length === 0) ? styles.firstButtonViewPressedStyle : null}
                                     onPress={this._onItemSelected.bind(this,buttonIndex)}
            >
                <Text style={styles.buttonText}>{text}</Text>
            </ButtonView>);
        });
        return <Dialog ref={this._handleRef} height={height} onRequestClose={this.props.onRequestClose}>
            <View style={styles.tip}>
                <View style={styles.tipBody}>
                    {titleView}
                    {buttons}
                    {destructiveBtn}
                </View>
                {cancelBtn}
            </View>
        </Dialog>;
    }
}

const styles = StyleSheet.create({
    tip: {
        ...StyleSheet.absoluteFillObject,
        left: GAP,
        right: GAP,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tipBody: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        backgroundColor: Colors.DEFAULT,
        borderRadius: 13,
        overflow: 'hidden'
    },

    titleView: {
        height: TITLE_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.55,
        borderColor: Colors.SPLIT
    },
    titleText: {
        color: Colors.TITLE,
        fontSize: 14
    },
    buttonView: {
        borderBottomWidth: 0.55,
        borderColor: Colors.SPLIT,
        height: BUTTON_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#007aff'
    },
    firstButtonViewPressedStyle: {
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13
    },

    destructiveButton: {
        borderBottomWidth: 0
    },
    destructiveButtonPressedStyle: {
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13
    },
    destructButtonText: {
        fontSize: 20,
        color: Colors.DESTRUCTIVE,
        textAlign: 'center'
    },

    cancelButton: {
        marginBottom: GAP,
        alignSelf: 'stretch',
        height: BUTTON_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT,
        borderRadius: 13,
        overflow: 'hidden'
    },
    cancelButtonPressedStyle: {
        borderRadius: 13
    },
    cancelButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#007aff',
        textAlign: 'center'
    }
});

mixin.onClass(ActionSheet, TimerMixin);
if (Platform.OS === 'ios') {
    ActionSheet = ActionSheetIOS;
}

export default ActionSheet