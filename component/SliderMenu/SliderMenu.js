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
} from 'react-native'
import Portal from '../../base/Portal'
import ButtonView from '../../base/ButtonView'
import {TabContrast, funcContrast} from '../../constant/Constant'
import Icon from '../../base/Icon'
import UserInfo from './UserInfo'
import {light,night} from './style'

const {width:windowWidth} = Dimensions.get('window')

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
        night: PropTypes.bool,
        onRequestClose: PropTypes.func.isRequired
    }

    static defaultProps = {
        night: false
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
        const styles = this.props.night ? night: light;
        return (
            <ButtonView
                effect={ButtonView.EFFECT.DEFAULT}
                onPress={()=>{this._closeSliderMenu(onRequestClose)}}
            >
                <View style={styles.container}>
                    <Animated.View
                        style={[styles.content,{
                            width: this.state.width,
                            opacity: this.state.opacity
                        }]}
                    >
                        <UserInfo
                            {...login}
                            night={this.props.night}
                            navigation={navigation}
                            onRequestClose={onRequestClose}
                        />
                        {
                            Object.keys(TabContrast).map((key) => {
                                return (
                                    <ButtonView
                                        style={styles.buttonView}
                                        effect={ButtonView.EFFECT.DEFAULT}
                                        underlayColor={this.props.night?'#333':'#FFF'}
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
                                    </ButtonView>
                                )
                            })
                        }
                        {
                            ['message', 'set', 'about'].map((key) => {
                                return (
                                    <ButtonView
                                        style={styles.buttonView}
                                        effect={ButtonView.EFFECT.DEFAULT}
                                        underlayColor={this.props.night?'#333':'#FFF'}
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
                                    </ButtonView>
                                )
                            })
                        }
                    </Animated.View>
                </View>
            </ButtonView>
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
                navigation.navigate('Setting');
                break;
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
                login: this.props.login,
                night: this.props.night
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

export default SliderMenu