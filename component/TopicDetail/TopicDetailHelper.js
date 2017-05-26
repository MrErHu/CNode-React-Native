import {URL_PREFIX}from '../../constant/Constant'
import {get} from '../../utils'


class TopicDetailHelper {

    async getData(topicId){
        let url = `${URL_PREFIX}/topic/${topicId}`
        const data = await get(url);
        if(data.success){
            return data.data
        }
    }
}

export default TopicDetailHelper