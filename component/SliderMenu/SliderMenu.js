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
const {width:windowWidth, height:windowHeight} = Dimensions.get('window')
import {TabContrast, funcContrast} from '../../constant/Constant'


class SliderMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: new Animated.Value(0)
        }
        this._closeSliderMenu = this._closeSliderMenu.bind(this)
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

    componentDidMount() {
        Animated.timing(
            this.state.width,
            {toValue: (windowWidth * 2 / 3)}
        ).start();
    }

    render() {
        const {tab, login, navigation, onRequestClose} = this.props;
        return (
            <TouchableWithoutFeedback onPress={()=>{this._closeSliderMenu(onRequestClose)}}>
                <View style={styles.container}>
                    <Animated.View
                        style={[styles.content,{width: this.state.width}]}
                    >
                        <UserInFo
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
                                            <Image
                                                style={styles.buttonIcon}
                                                source={ImagePath[key]}
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
                                        key={key}
                                    >
                                        <View style={styles.button}>
                                            <Image
                                                style={styles.buttonIcon}
                                                source={ImagePath[key]}
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

    _closeSliderMenu(callback) {
        Animated.timing(
            this.state.width,
            {
                duration: 500,
                toValue: 0
            }
        ).start(() => {
            callback()
        });
    }
}

const UserInFo = (props) => {
    const {isLogin,navigation,onRequestClose} = props
    if (isLogin === false) {
        return (
            <View style={styles.userWithoutLoginView}>
                <TouchableWithoutFeedback
                    onPress={
                        ()=>{
                            onRequestClose(navigation.navigate('Login'));
                        }
                    }
                >
                    <View style={styles.userWithoutLoginContainer}>
                        <Image
                            source={require('../../asset/image/login.png')}
                            style={styles.userWithoutLoginContent}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    } else {
        return (
            <View style={[styles.userContent,styles.border]}>
                <View style={styles.avatarView}>
                </View>
                <View style={styles.userInfoView}>
                    <View style={styles.userInfoViewLeft}>
                        <Text style={styles.userInfoViewLeftText}>TakWolf</Text>
                        <Text style={styles.userInfoViewLeftText}>积分: 370</Text>
                    </View>
                    <View style={styles.userInfoViewRight}>
                        <Text>注销</Text>
                    </View>
                </View>
            </View>
        )
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
    userContent: {
        flex: 3,
        paddingTop: 20,
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
        width: 18,
        height: 18,
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
    },
    avatarView: {
        flex: 2
    },
    userInfoView: {
        flex: 1,
        flexDirection: 'row'
    },
    userInfoViewLeft: {
        flex: 2,
        flexDirection: 'column'
    },
    userInfoViewLeftText: {
        flex: 1,
        marginLeft: 20
    },
    userInfoViewRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userWithoutLoginView: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    userWithoutLoginContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#00bcd4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userWithoutLoginContent: {
        width: 32,
        height: 32,
    },
})

const ImagePath = {
    all: require('../../asset/image/all.png'),
    job: require('../../asset/image/job.png'),
    ask: require('../../asset/image/ask.png'),
    share: require('../../asset/image/share.png'),
    good: require('../../asset/image/good.png'),
    message: require('../../asset/image/remind.png'),
    set: require('../../asset/image/set.png'),
    about: require('../../asset/image/about.png')
}

export default SliderMenu