import {bindActionCreators}from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../action/loginAction'
import Login from '../../component/Login'

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)

