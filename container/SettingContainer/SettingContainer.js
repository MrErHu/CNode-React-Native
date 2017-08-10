import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Setting from '../../component/Setting'
import * as actions from '../../action/settingAction'

const mapStateToProps = (state,ownProps)=>{
    return state.get('setting').toJS();
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Setting)


