import {get} from '../../utils'
import {URL_PREFIX} from '../../constant/Constant'


class UserContentHelper {

    getData(userName){
        const url = `${URL_PREFIX}/user/${userName}`
        return get(url).then((data)=>{
            if(data.success){
                return data.data
            }
        })
    }
}

export default UserContentHelper