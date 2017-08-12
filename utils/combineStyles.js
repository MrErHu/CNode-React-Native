import _ from 'lodash'

export default function combineStyles(style, theme) {
    const result = {};
    _.each(_.keys(style),(key)=>{
        result[key] = {
            ...style[key],
            ...theme[key]
        }
    })
    return result;
}