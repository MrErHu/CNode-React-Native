import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import Portal from '../../base/Portal'
const {width:windowWidth, height:windowHeight} = Dimensions.get('window')
import {TabContrast, funcContrast} from '../../constant/Constant'


class SliderMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: new Animated.Value(0)
        }

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
            onRequestClose={(callback)=>{
                Portal.closeModal(tag);
                callback && callback();
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
        const {tab} = this.props;
        return (
            <TouchableWithoutFeedback onPress={()=>{this.props.onRequestClose()}}>
                <View style={styles.container}>
                    <Animated.View
                        style={[styles.content,{width: this.state.width}]}
                    >
                        <View style={[styles.userContent,styles.border]}>
                            <Text>'User info'</Text>
                        </View>
                        {
                            Object.keys(TabContrast).map((key) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={key}
                                    >
                                        <View
                                            style={[styles.button,tab === key ? styles.buttonActive: null]}
                                        >
                                            <Image
                                                style={styles.buttonIcon}
                                                source={ImagePath[key]}
                                            />
                                            <Text style={styles.buttonText}>
                                                {TabContrast[key]}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                        {
                            ['message', 'set', 'about'].map((key) => {
                                return (
                                    <View
                                        style={styles.button}
                                        key={key}
                                    >
                                        <Image
                                            style={styles.buttonIcon}
                                            source={ImagePath[key]}
                                        />
                                        <Text style={styles.buttonText}>
                                            {funcContrast[key]}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
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
        flex: 4,
        paddingTop: 20
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
    }
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