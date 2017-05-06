import {get} from '../../utils/network'
import _ from 'lodash'
import {URL_PREFIX} from '../../constant/Constant'

let requestURL =  URL_PREFIX + '/topics?'

class TopicListHelper{
    constructor(props){
        this.props = props;
        this.getData = this.getData.bind(this)
    }

    updateHelper(nextProps){
        this.props = nextProps;
    }

    getData(options){
        let url = requestURL
        const {limit,mdrender,tab} = this.props
        let keys = Object.keys(options);
        _.each(keys, (key) => {
            url += `${key}=${options[key]}&`
        })
        url += `limit=${limit}&`
        url += `mdrender=${mdrender}&`
        url += `tab=${tab}`
        return get(url).then(json=>json.data)
    }
}

export default TopicListHelper