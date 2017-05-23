import {get} from '../../utils'
import {URL_PREFIX} from '../../constant/Constant'


class UserContentHelper {

    async getData(userName){
        const url = `${URL_PREFIX}/user/${userName}`
        const data = await get(url)
        if(data.success){
            return data.data
        }
    }
}

export default UserContentHelper