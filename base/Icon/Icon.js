import React, {PropTypes, Component} from 'react'
import {Image, Text} from 'react-native'
import createIconSet from 'react-native-vector-icons/lib/create-icon-set'
import isString from 'lodash/isString'
import glyphMap from '../../asset/fonts/Iconfont.json'
import iconMap from '../../asset/icons/icon'
const cache = {};

for (let key in glyphMap) {
    const val = glyphMap[key];
    cache[key] = parseInt(val[0],10);
}
const IconImp = createIconSet(cache, 'Iconfont', 'Iconfont.ttf');

const propTypes = {
    // 图标名，可以是字体图标和图片图标名,通过图标名可生成对应图标
    // 字体图标名: 参考 '../assets/fonts/Ionicons.json' 下 keys
    // 图片图标名: 参考 '../assets/icons/icon.js' 下 keys
    name: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(glyphMap)), PropTypes.oneOf(Object.keys(iconMap)), Image.propTypes.source, PropTypes.string]),
    // 字体图标大小，仅字体图标有效
    size: PropTypes.number,
    // 字体图标颜色，仅字体图标有效
    color: PropTypes.string,
    // 图标样式
    style: PropTypes.oneOfType([IconImp.propTypes.style, Image.propTypes.style]),
    // 图片资源，以图片作为图标
    source: Image.propTypes.source
}

export default class Icon extends Component {
    static propTypes = propTypes;

    static hasIcon(name) {
        return glyphMap[name] != null || iconMap[name] != null;
    }

    static hasPressedIcon(name) {
        return glyphMap[name + '-pressed'] != null || iconMap[name + '-pressed'] != null;
    }

    static hasSelectedIcon(name) {
        return glyphMap[name + '-selected'] != null || iconMap[name + 'selected'] != null;
    }

    setNativeProps(nativeProps) {
        if (this.root) {
            this.root.setNativeProps(nativeProps);
        }
    }

    root = null;
    handleRef = (ref) => {
        this.root = ref;
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {name, color, size, ...props}=this.props;
        if (glyphMap[name]) {
            return <IconImp {...props} ref={this.handleRef} name={name} size={size || glyphMap[name][1]}
                                       color={color || glyphMap[name][2]}/>
        }else if (iconMap[name]) {
            const source = iconMap[name][0];
            const width = iconMap[name][1];
            const height = iconMap[name][2];
            const style = [{
                width,
                height
            }, props.style];
            if (isString(source)) {
                if (source.indexOf('http') === 0) {
                    return <Image {...props} style={style} source={{uri: source}}/>
                }
            }
            return <Image {...props} style={style} source={source} />
        } else {
            const source = props.source || name;
            if (isString(source)) {
                return source.length ? <Image {...props} source={{uri: source}} /> : null
            } else {
                return <Image {...props} source={source} />
            }
        }
    }
}
