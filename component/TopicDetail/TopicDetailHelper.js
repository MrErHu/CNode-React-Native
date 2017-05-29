import {URL_PREFIX}from '../../constant/Constant'
import _ from 'lodash'
import {get} from '../../utils'

const intialOptions = {
    mdrender: false
}


class TopicDetailHelper {

    async getData(topicId, options = intialOptions) {
        let url = `${URL_PREFIX}/topic/${topicId}`
        const keys = Object.keys(options)
        _.each(keys, (key, index) => {
            url += index === 0 ? '?' : ''
            url += `${key}=${options[key]}`
            url += index === keys.length - 1 ? '' : '&'
        })
        const data = await get(url);
        if (data.success) {
            return data.data
        }
    }
}

export default TopicDetailHelper