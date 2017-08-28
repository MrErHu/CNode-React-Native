import {connect} from 'react-redux'
import UserContent from '../../component/UserContent'

const mapStateToProps = (state,ownProps)=>{
    return {
        setting: state.get('setting').toJS()
    }
}

export default connect(mapStateToProps)(UserContent);
