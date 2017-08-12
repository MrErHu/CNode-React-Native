import {get} from '../../utils/network'
import {URL_PREFIX} from '../../constant/Constant'

class MessageHelper {

    async getData(props){
        const {login} = props.navigation.state.params
        const {accessToken} = login
        const url = `${URL_PREFIX}/messages?mdrender=true&accesstoken=${accessToken}`

        const data = await get(url)
        if(data.success){
            return data.data
        }
    }

}

export default MessageHelper