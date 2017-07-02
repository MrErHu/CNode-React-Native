import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    Image,
    Easing,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native'
import Portal from '../../base/Portal'
import {TabContrast, funcContrast} from '../../constant/Constant'
import Icon from '../../base/Icon'
import UserInfo from './UserInfo'

const {width:windowWidth, height:windowHeight} = Dimensions.get('window')

class SliderMenu extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            width: new Animated.Value(0),
            opacity: new Animated.Value(1)
        }
        this._closeSliderMenu = this._closeSliderMenu.bind(this)
        this._navigateMessage = this._navigateMessage.bind(this)
        this._menuPressHandler = this._menuPressHandler.bind(this)
    }

    static propTypes = {
        tab: PropTypes.string.isRequired,
        onRequestClose: PropTypes.func.isRequired
    }

    static showSliderMenuWithOptions(options) {
        const tag = Portal.allocateTag();
        Portal.showModal(tag, <SliderMenu
            key={tag}
            {...options}
            onRequestClose={()=>{
                Portal.closeModal(tag)
            }}
        />)
    }

    static childContextTypes = {
        actions: PropTypes.object
    }

    getChildContext() {
        const {actions} = this.props;
        return {
            actions
        }
    }

    componentDidMount() {
        Animated.timing(this.state.width,
            {
                toValue: (windowWidth * 2 / 3)
            }
        ).start();
    }

    render() {
        const {tab, login, navigation, onRequestClose} = this.props;
        return (
            <TouchableWithoutFeedback onPress={()=>{this._closeSliderMenu(onRequestClose)}}>
                <View style={styles.container}>
                    <Animated.View
                        style={[styles.content,{
                            width: this.state.width,
                            opacity: this.state.opacity
                        }]}
                    >
                        <UserInfo
                            {...login}
                            navigation={navigation}
                            onRequestClose={onRequestClose}
                        />
                        {
                            Object.keys(TabContrast).map((key) => {
                                return (
                                    <TouchableHighlight
                                        style={styles.buttonView}
                                        underlayColor={'#F2F2F2'}
                                        key={key}
                                        onPress={this._tabChangeHandler.bind(this,key)}
                                    >
                                        <View style={[styles.button,tab === key ? styles.buttonActive: null]}>
                                            <Icon
                                                name={key}
                                                style={styles.buttonIcon}
                                            />
                                            <Text style={styles.buttonText}>
                                                {TabContrast[key]}
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })
                        }
                        {
                            ['message', 'set', 'about'].map((key) => {
                                return (
                                    <TouchableHighlight
                                        style={styles.buttonView}
                                        underlayColor={'#F2F2F2'}
                                        key={key}
                                        onPress={this._menuPressHandler.bind(this,key)}
                                    >
                                        <View style={styles.button}>
                                            <Icon
                                                name={key}
                                                style={styles.buttonIcon}
                                            />
                                            <Text style={styles.buttonText}>
                                                {funcContrast[key]}
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })
                        }
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _tabChangeHandler(tab) {
        const {actions, onRequestClose} = this.props;
        actions.updateTab(tab);
        this._closeSliderMenu(onRequestClose)
    }

    _menuPressHandler(tab) {
        const {onRequestClose, navigation} = this.props;

        switch (tab) {
            case 'about':
                navigation.navigate('About');
                break;
            case 'set':
                ;
            case 'message':
                this._navigateMessage();
                break;
        }
        this._closeSliderMenu(onRequestClose);
    }

    _closeSliderMenu(callback) {
        Animated.parallel([
            Animated.timing(
                this.state.width,
                {
                    duration: 200,
                    toValue: 0
                }
            )
        ]).start(() => {
            callback()
        });
    }

    _navigateMessage() {
        if (this._validateLogin()) {
            const {navigation} = this.props;
            navigation.navigate('Message', {
                login: this.props.login
            })
        }
    }

    _validateLogin() {
        const {login, navigation} = this.props;
        if (login.isLogin === false) {
            navigation.navigate('Login');
            return false;
        } else {
            return true;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: windowWidth,
        height: windowHeight
    },
    content: {
        backgroundColor: '#FFFFFF',
        height: windowHeight,
        flexDirection: 'column'
    },
    buttonView: {
        flex: 1
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonActive: {
        backgroundColor: '#F2F2F2',
    },
    buttonIcon: {
        marginLeft: 20,
        marginRight: 30
    },
    buttonText: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666666'
    },
    border: {
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc'
    }
})

export default SliderMenu