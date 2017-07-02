import React, {Component, PropTypes} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Easing,
    Animated,
} from 'react-native';
import ButtonView from '../../base/ButtonView'
import Portal from '../../base/Portal'
import Camera from 'react-native-camera';

export default class QcCodeScan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            line_position: new Animated.Value(0),
        }
        this._onBarCodeRead = this._onBarCodeRead.bind(this)
    }

    static showQcCodeScan({onValueChange}) {
        const tag = Portal.allocateTag();
        Portal.showModal(tag, <QcCodeScan
            key={tag}
            onValueChange={onValueChange}
            onRequestClose={() => {
                Portal.closeModal(tag);
            }}
        />)
    }

    static propTypes = {
        onValueChange: PropTypes.func
    }

    static defaultProps = {
        onValueChange: () => {}
    }

    componentDidMount() {
        const lineAnimated = () => {
            this.state.line_position.setValue(0);
            Animated.timing(this.state.line_position, {
                toValue: 200,
                duration: 2000,
                easing: Easing.linear,
            }).start(() => {
                lineAnimated();
            });
        };

        setTimeout(() => {
            lineAnimated();
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <ButtonView
                        effect={ButtonView.EFFECT.DEFAULT}
                        onPress={()=>{this.props.onRequestClose()}}
                    >
                        <Text style={styles.toolbarClose}>
                            关闭
                        </Text>
                    </ButtonView>
                    <Text style={styles.toolbarTitle}>
                        扫一扫
                    </Text>
                    <Text style={styles.toolbarClose}></Text>
                </View>
                <Camera
                    ref={(cam) => { this.camera = cam } }
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    captureQuality={'medium'}
                    onBarCodeRead={this._onBarCodeRead}
                >
                    <View style={styles.modal}>
                        <View style={styles.shade}></View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.shade}></View>
                            <View style={styles.qrcode}>
                                <Animated.View style={[styles.line, {
                                    transform: [{
                                        translateY: this.state.line_position
                                    }]
                                }]}>

                                </Animated.View>
                            </View>
                            <View style={styles.shade}></View>
                        </View>

                        <View style={[styles.shade, styles.content]}>
                            <Text style={styles.text}>将二维码/条码放入框内，即可自动扫描</Text>
                        </View>
                    </View>
                </Camera>
            </View>
        );
    }

    _onBarCodeRead(data) {
        const {onValueChange,onRequestClose} = this.props
        onValueChange(data);
        onRequestClose();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        height: 50,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    toolbarTitle: {
        color: '#fff',
        fontSize: 20
    },
    toolbarClose: {
        color: '#fff',
        fontSize: 18,
        width: 50,
        paddingLeft: 10,
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    shade: {
        flex: 1,
        backgroundColor: 'rgba(1, 1, 1, 0.65)',
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
    },
    qrcode: {
        width: 200,
        height: 200,
        alignItems: 'center',
    },
    text: {
        color: '#ccc',
        fontSize: 15,
    },
    line: {
        width: 200,
        height: 1,
        backgroundColor: 'rgba(30, 255, 145, 1)',
    }
});