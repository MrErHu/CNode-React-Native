import React, {PropTypes} from 'react'
import {Dimensions, Image, View, StyleSheet, Text, Linking} from 'react-native'
import _ from 'lodash'
import RNHtmlView from 'react-native-htmlview'
import {night,light} from './style'

const screenWidth = Dimensions.get("window").width

class HtmlView extends React.Component {

    constructor(props) {
        super(props)
        this._handleLinkPress = this._handleLinkPress.bind(this)
        this._renderNode = this._renderNode.bind(this)
        this._onImageLoadEnd = this._onImageLoadEnd.bind(this)
        this._images = {}
        const _styles = {}
        const defaultHtmlStyles = props.night ? night : light;
        for (let key in defaultHtmlStyles) {
            if (props.style[key]) {
                _styles[key] = {...defaultHtmlStyles[key], ...props.style[key]}
            } else {
                _styles[key] = defaultHtmlStyles[key]
            }
        }
        this._styles = StyleSheet.create(_styles)
    }

    static propTypes = {
        value: PropTypes.string,
        style: PropTypes.object,
        maxImageWidth: PropTypes.number
    }

    static defaultProps = {
        maxImageWidth: screenWidth - 20,
        style: {},
        value: ""
    }

    _handleLinkPress(url) {
        Linking.canOpenURL(url).then(support => {
            if (support) {
                Linking.openURL(url)
            }
        }).catch(err => console.log(err))
    }

    _onImageLoadEnd(uri, index) {
        const {maxImageWidth} = this.props
        Image.getSize(uri, (w, h) => {
            if (w > maxImageWidth) {
                h = (maxImageWidth / w) * h
                w = maxImageWidth
            }
            this._images[index] && this._images[index].setNativeProps({
                style: {
                    width: w,
                    height: h
                }
            })
        }, err => {
        })
    }

    _renderNode(node, index) {
        if (node.name == 'iframe') {
            return (
                <View key={'iframe_'+index} style={{width: 200, height: 200}}>
                    <Text>{node.attribs.src}</Text>
                </View>
            )
        }
        if (node.name === 'img') {
            let uri = node.attribs.src
            if (!_.startsWith(uri, 'https')) {
                uri = `https:${uri}`
            }
            return (
                <Image
                    source={{uri:uri}}
                    style={this._styles.image}
                    resizeMode="center"
                    key={'img_'+index}
                    onLoadEnd={()=>this._onImageLoadEnd(uri,index)}
                    ref={(ref)=>{this._images[index] = ref}}
                />
            )
        }
    }

    render() {
        const {value} = this.props
        return (
            <RNHtmlView
                value={value}
                stylesheet={this._styles}
                onLinkPress={this._handleLinkPress}
                renderNode={this._renderNode}
            />
        )
    }
}

export default HtmlView