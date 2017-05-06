import {post} from '../../utils/network'
import {URL_PREFIX} from '../../constant/Constant'

const url = URL_PREFIX + '/accesstoken'

class LoginHelper {

    constructor(props){
        this.props = props;
        this.doLogin = this.doLogin.bind(this)
    }

    updateHelper(nextProps){
        this.props = nextProps;
    }

    doLogin(accessToken) {
        return post(url, {
            accesstoken: accessToken
        }).then(data => {
            if (data.success) {
                const {success,...other} = data;
                this.props.actions.login({
                    ...other,
                    accessToken
                })
            }
            return data.success
        })
    }
}

export default LoginHelper