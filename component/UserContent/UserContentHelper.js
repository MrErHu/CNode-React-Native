import {get} from '../../utils'
import {URL_PREFIX} from '../../constant/Constant'


class UserContentHelper {

    async getData(userName){

        const userUrl = `${URL_PREFIX}/user/${userName}`
        const collectUrl = `${URL_PREFIX}/topic_collect/${userName}`
        const promises = [userUrl,collectUrl].map(url=>get(url))
        const results = await Promise.all(promises)

        if(results[0].success && results[1].success){
            const data = {
                ...results[0].data,
                topic_collect: results[1].data
            }
            return data
        }
    }
}

export default UserContentHelper